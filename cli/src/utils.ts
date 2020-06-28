import fs from 'fs';
import shell from 'shelljs';
import chalk from 'chalk';

export const BASE_DIR = `${__dirname}/../../${(process.env.TEST_DIR || '.')}`;
export const DEVOPS_DIR = `${BASE_DIR}/devops`;
const SERVER_DIR = `${BASE_DIR}/server`;
const VIEW_DIR = `${BASE_DIR}/view`;
const DESKTOP_DIR = `${BASE_DIR}/desktop`;

export const getModuleName = (moduleDir: string) => {
    switch (moduleDir) {
        case SERVER_DIR:
            return 'Server';
        case VIEW_DIR:
            return 'View';
        case DESKTOP_DIR:
            return 'Desktop';
        case BASE_DIR:
            return 'base';
    }
};

export const findModuleDirs = (): string[] => {
    const moduleDirs = [SERVER_DIR, VIEW_DIR]
        .filter(dir => fs.existsSync(dir));

    if (moduleDirs.length == 0) {
        moduleDirs.push(BASE_DIR);
    }
    if (fs.existsSync(DESKTOP_DIR)) {
        moduleDirs.push(DESKTOP_DIR);
    }

    return moduleDirs;
};

export const findProvisionEnvs = (): string[] => {
    const envs = [];
    if (!fs.existsSync(DEVOPS_DIR)) {
        return envs;
    }
    return fs.readdirSync(`${DEVOPS_DIR}/provision/environments`)
        .filter(name => fs.lstatSync(`${DEVOPS_DIR}/provision/environments/${name}`).isDirectory())
        .filter(name => name != 'all');
};

export const runUnsafeScript = async (directory: string, script: string, message: string) => {
    shell.echo('-n', message);
    shell.pushd('-q', directory);

    return new Promise(resolve => {
        shell.exec(
            script, {
                silent: true
            },
            (code, stdout, stderr) => {
                if (code != 0) {
                    shell.echo(chalk.red('ERROR'));
                    shell.echo(stdout);
                    shell.popd('-q');
                    resolve(false);
                } else {
                    shell.echo(chalk.green('DONE'));
                    shell.popd('-q');
                    resolve(true);
                }
            });
    });
};
