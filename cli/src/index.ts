#!/usr/bin/env ts-node-script
import inquirer from 'inquirer';
import yargs from 'yargs';
import {existsSync} from 'fs';

import start from './start';
import check from './check';
import test from './test';
import build from './build';
import packageModules from './package';
import provision, {ProvisionAction, ProvisionEnvironmentDescription} from './provision';
import manageVagrant, {VagrantAction} from './vagrant';
import {findModuleDirs, findProvisionEnvs, getModuleName} from './utils';

const MODULE_DIRS = findModuleDirs();
const MODULE_VAGRANT_DIRS = MODULE_DIRS
    .map(moduleDir => `${moduleDir}/vagrant`)
    .filter(vagrantDir => existsSync(vagrantDir));

enum Action {
    Start = 'Start development',
    Check = 'Check code',
    Test = 'Test',
    Build = 'Build',
    Package = 'Package',
    Provision = 'Provision',
    Vagrant = 'Manage Vagrant boxes'
}

const options = [
    {
        type: 'list',
        name: 'action',
        message: 'Choose action:',
        choices: Object.values(Action)
            .filter(action => action != Action.Vagrant || MODULE_VAGRANT_DIRS.length > 0)
            .filter(action => action != Action.Provision || existsSync('../devops'))
    },
    {
        type: 'list',
        name: 'moduleDir',
        message: 'Choose module:',
        default: 'all',
        choices: () => {
            const choices = MODULE_DIRS.map(moduleDir => ({
                name: getModuleName(moduleDir),
                value: moduleDir
            }));
            if (MODULE_DIRS.length > 1) {
                choices.splice(0, 0, {
                    name: 'All',
                    value: 'all'
                });
            }

            return choices;
        },
        when: ({action}) => {
            switch (action) {
                case Action.Start:
                case Action.Check:
                case Action.Build:
                case Action.Package:
                case Action.Test:
                    return MODULE_DIRS.length > 1;
                default:
                    return false;
            }
        }
    },
    {
        type: 'list',
        name: 'vagrantDir',
        message: 'Choose Vagrant box:',
        choices: MODULE_VAGRANT_DIRS.map(vagrantDir => ({
            name: getModuleName(vagrantDir.substring(0, vagrantDir.lastIndexOf('/'))),
            value: vagrantDir
        })),
        when: ({action}) => action == Action.Vagrant && MODULE_VAGRANT_DIRS.length > 1
    },
    {
        type: 'list',
        name: 'vagrantAction',
        message: 'Action:',
        choices: Object.values(VagrantAction),
        when: ({action}) => action == Action.Vagrant
    },
    {
        type: 'list',
        name: 'provisionEnv',
        message: 'Choose deploy environment:',
        choices: findProvisionEnvs().map(env => ({
            name: ProvisionEnvironmentDescription[env] || env,
            value: env
        })),
        default: 'local',
        when: ({action}) => action == Action.Provision
    },
    {
        type: 'list',
        name: 'provisionAction',
        message: 'Action:',
        choices: Object.values(ProvisionAction),
        when: ({action}) => action == Action.Provision
    },
    {
        type: 'confirm',
        name: 'repackage',
        message: 'Do you want to rebuild and repackage project?',
        when: ({provisionAction}) => {
            switch (provisionAction) {
                case ProvisionAction.Full:
                case ProvisionAction.Deploy:
                case ProvisionAction.Setup:
                    return true;
                default:
                    return false;
            }
        }
    }
];

const runInteractiveTool = () => {
    return inquirer.prompt(options).then(async ({action, moduleDir, vagrantDir, provisionEnv, vagrantAction, provisionAction, repackage}) => {
        const moduleDirs = !moduleDir || moduleDir == 'all' ? MODULE_DIRS : [moduleDir];

        switch (action) {
            case Action.Start:
                await start(moduleDirs);
                break;
            case Action.Check:
                await check(moduleDirs);
                break;
            case Action.Test:
                await test(moduleDirs);
                break;
            case Action.Build:
                await build(moduleDirs);
                break;
            case Action.Package:
                await packageModules(moduleDirs);
                break;
            case Action.Provision:
                await provision(provisionEnv, provisionAction, repackage);
                break;
            case Action.Vagrant:
                manageVagrant(vagrantDir || MODULE_VAGRANT_DIRS[0], vagrantAction);
                break;
        }
    });
};

const parseOptions = () => {
    const noop = () => {
        //
    };

    const moduleOptionCheck = yargs => {
        yargs.coerce('module', module => {
            if (MODULE_DIRS.length > 1) {
                const moduleDir = MODULE_DIRS.find(moduleDir => moduleDir.endsWith(`/${module}`));
                if (!moduleDir) {
                    throw new Error(`Unsupported module '${module}', expected one of [${MODULE_DIRS.map(moduleDir => moduleDir.substring(moduleDir.lastIndexOf('/') + 1)).join(', ')}] or empty for all.`);
                }
                return [moduleDir];
            }
            return MODULE_DIRS;
        });
    };

    const execProvision = (provisionAction: ProvisionAction) => async ({env, rebuild = true}) =>
        await provision(env, provisionAction, rebuild);

    yargs
        .scriptName('cli.sh')
        .command(
            '$0', 'Run interactive tool',
            noop,
            runInteractiveTool
        )
        .command(
            `start${MODULE_DIRS.length > 1 ? ' [module]' : ''}`, `Start ${MODULE_DIRS.length > 1 ? 'module or whole project (if module not specified)' : 'project'} in development mode`,
            moduleOptionCheck,
            argv => start(argv.module ? [argv.module.toString()] : MODULE_DIRS)
        )
        .command(
            `check${MODULE_DIRS.length > 1 ? ' [module]' : ''}`, `Run checks ${MODULE_DIRS.length > 1 ? 'module or whole project (if module not specified)' : 'project'} for errors`,
            moduleOptionCheck,
            argv => check(argv.module ? [argv.module.toString()] : MODULE_DIRS)
        )
        .command(
            `test${MODULE_DIRS.length > 1 ? ' [module]' : ''}`, `Run tests for ${MODULE_DIRS.length > 1 ? 'module or whole project (if module not specified)' : 'project'}`,
            moduleOptionCheck,
            argv => test(argv.module ? [argv.module.toString()] : MODULE_DIRS)
        )
        .command(
            `build${MODULE_DIRS.length > 1 ? ' [module]' : ''}`, `Build ${MODULE_DIRS.length > 1 ? 'module or whole project (if module not specified)' : 'project'}`,
            moduleOptionCheck,
            argv => build(argv.module ? [argv.module.toString()] : MODULE_DIRS)
        )
        .command(
            `package${MODULE_DIRS.length > 1 ? ' [module]' : ''}`, `Packages previously built ${MODULE_DIRS.length > 1 ? 'module or whole project (if module not specified)' : 'project'}`,
            moduleOptionCheck,
            argv => packageModules(argv.module ? [argv.module.toString()] : MODULE_DIRS)
        )
        .command(
            'provision <action>', 'Provision project to specified environment',
            yargs => {
                yargs
                    .command('init', 'Initialize deployment infrastructure', noop, execProvision(ProvisionAction.Init))
                    .command('ping', 'Ping deployment environment', noop, execProvision(ProvisionAction.Ping))
                    .command('setup', 'Setup deployment infrastructure', noop, execProvision(ProvisionAction.Setup))
                    .command('deploy', 'Deploy project to deployment environment', noop, execProvision(ProvisionAction.Deploy))
                    .describe('env', 'Deployment environment')
                    .default('env', 'local')
                    .choices('env', findProvisionEnvs())
                    .describe('no-rebuild', 'Specify if you do not require to rebuild the project before deployment.');
            }
        )
        .wrap(100)
        .help()
        .argv;
};

parseOptions();
