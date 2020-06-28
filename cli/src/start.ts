import shell from 'shelljs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import {existsSync} from 'fs';
import {getModuleName, runUnsafeScript} from './utils';

const toShellCommands = (moduleDir: string) => `cd ${moduleDir}; npm run start:dev; bash -i`;

const tryStartVagrant = async (moduleDir: string) => {
    if (!existsSync(`${moduleDir}/vagrant`)) {
        return true;
    }

    shell.echo();
    const {startVagrant} = await inquirer.prompt([{
        type: 'confirm',
        name: 'startVagrant',
        message: 'Do you want to start Vagrant?'
    }]);
    if (!startVagrant) {
        return true;
    }

    return runUnsafeScript(`${moduleDir}/vagrant`, 'vagrant up', `Starting Vagrant box for ${getModuleName(moduleDir)} (this might take a minute or two)...`);
};

const startModule = async (moduleDir: string) => {
    shell.echo(`Starting ${getModuleName(moduleDir)} module...`);
    if (!await tryStartVagrant(moduleDir)) {
        return;
    }
    shell.exec(toShellCommands(moduleDir));
};

const startModulesInTmux = async (moduleDirs: string[]) => {
    shell.exec('tmux kill-session -t build', {silent: true});
    shell.exec('tmux new-session -s build -d');

    for (let index = 0; index < moduleDirs.length; index++) {
        const moduleDir = moduleDirs[index];
        shell.echo('-n', `Starting ${getModuleName(moduleDir)} module...`);
        if (!await tryStartVagrant(moduleDir)) {
            return;
        }
        if (index == 0) {
            shell.exec(`tmux new-window '${toShellCommands(moduleDir)}'`);
        } else {
            shell.exec(`tmux split-window -h '${toShellCommands(moduleDir)}'`);
        }
        shell.echo(chalk.green('DONE'));
    }
    shell.echo(`Run ${chalk.cyan('tmux attach')} to view and manage running processes.`);
};

const checkTmuxExec = () => {
    if (shell.exec('type tmux &> /dev/null', {silent: true}).code != 0) {
        shell.echo(`${chalk.red('Tmux executable cannot be found.')}\nVisit https://github.com/tmux/tmux/wiki/Installing for installation instructions.`);
        return false;
    } else {
        return true;
    }
};

const start = async (moduleDirs: string[]) => {
    if (moduleDirs.length == 1) {
        await startModule(moduleDirs[0]);
    } else {
        if (!checkTmuxExec()) {
            return;
        }
        await startModulesInTmux(moduleDirs);
    }
};

export default start;
