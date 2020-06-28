import fs, {existsSync} from 'fs';
import shell from 'shelljs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {DEVOPS_DIR, findModuleDirs} from './utils';
import build from './build';
import packageModules from './package';
import manageVagrant, {VagrantAction} from './vagrant';

const LOCAL_ENV_VAGRANT_DIR = `${DEVOPS_DIR}/local`;

export enum ProvisionEnvironmentDescription {
    local = 'Local',
    dev = 'Development/Test',
    prod = 'Production'
}

export enum ProvisionAction {
    Full = 'Full Infrastructure Setup',
    Deploy = 'Deploy Application',
    Init = 'Prepare Infrastructure',
    Setup = 'Create/Update Infrastructure',
    Ping = 'Ping'
}

const getProjectName = () => {
    const variables = fs.readFileSync(`${DEVOPS_DIR}/provision/environments/all/group_vars/all/01_all.yml`).toString();
    const regex = /project_name: (.*)/;
    const match = regex.exec(variables);
    if (match) {
        return match[1];
    } else {
        return null;
    }
};

const startLocal = () => manageVagrant(LOCAL_ENV_VAGRANT_DIR, VagrantAction.Start);

const buildAndPackage = async (rebuild: boolean) => {
    if (!rebuild) {
        return;
    }

    const modules = findModuleDirs();
    await build(modules);
    await packageModules(modules);
};

const runAnsiblePlaybook = async (provisionEnv, playbook) => await new Promise(
    (resolve, reject) => {
        shell.pushd('-q', `${DEVOPS_DIR}/provision`);
        shell.exec(
            `ansible-playbook --vault-password-file ../config/vault -i ./environments/all/hosts.yml -i ./environments/${provisionEnv}/hosts.yml ${playbook}`,
            (code) => {
                if (code != 0) {
                    shell.echo(chalk.red('Error occurred while running playbook! See above for details.'));
                    shell.popd('-q');
                    reject();
                } else {
                    shell.echo(chalk.green('Playbook finished successfully!'));
                    shell.popd('-q');
                    resolve();
                }
            });
    }
);

const init = async (provisionEnv: string) => {
    shell.echo('Running Ansible playbook to prepare infrastructure...');
    return runAnsiblePlaybook(provisionEnv, `infrastructure-${provisionEnv}.yml`);
};

const ping = (provisionEnv: string) => {
    shell.echo('Pinging Ansible host and containers...');
    try {
        shell.pushd('-q', `${DEVOPS_DIR}/provision`);
        shell.exec(
            `ANSIBLE_HOST_KEY_CHECKING=False ansible --vault-password-file ../config/vault -i ./environments/all/hosts.yml -i ./environments/${provisionEnv}/hosts.yml all -m ping`
        );
    } finally {
        shell.popd('-q');
    }
};

const setup = async (provisionEnv: string, rebuild: boolean) => {
    await buildAndPackage(rebuild);
    shell.echo('Running Ansible playbook to install containers...');
    await runAnsiblePlaybook(provisionEnv, 'setup.yml');
};

const deploy = async (provisionEnv: string, rebuild: boolean) => {
    await buildAndPackage(rebuild);
    shell.echo('Running Ansible playbook to deploy application...');
    await runAnsiblePlaybook(provisionEnv, 'deploy.yml');
};

const checkAnsibleExec = () => {
    if (shell.exec('ansible --help', {silent: true}).code != 0) {
        shell.echo(`${chalk.red('Ansible executable cannot be found.')}\nVisit https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html for installation instructions.`);
        return false;
    } else {
        return true;
    }
};

const checkVaultPassword = () => {
    if (!existsSync(`${DEVOPS_DIR}/config/vault`)) {
        shell.echo(`${chalk.red('Ansible Vault password file cannot be found.')}\nAsk project administrator for the file and place it as devops/config/vault.`);
        return false;
    }
    return true;
};

const confirmSSHPublicKey = async (provisionEnv: string) => {
    if (provisionEnv != 'local') {
        shell.echo(`Before you continue, make sure remote deployment server is SSH accessible and public key (devops/provision/environments/${provisionEnv}/files/host_rsa.pub) is authorized (host:~/.ssh/authorized_keys)`);
        const {canContinue} = await inquirer.prompt([{
            type: 'confirm',
            name: 'canContinue',
            message: 'Do you want to continue?'
        }]);
        return canContinue;
    } else {
        return true;
    }
};

const confirmLocalDevHost = async (provisionEnv: string) => {
    if (provisionEnv == 'local') {
        shell.echo(`Before continue, please ensure that ${getProjectName()}.local-dev is aliased on 127.0.0.1 within your /etc/hosts file.`);
        const {canContinue} = await inquirer.prompt([{
            type: 'confirm',
            name: 'canContinue',
            message: 'Do you want to continue?'
        }]);
        return canContinue;
    } else {
        return true;
    }
};

const provision = async (provisionEnv: string, action: ProvisionAction, repackage: boolean) => {
    if (!checkAnsibleExec()) {
        return;
    }
    if (!checkVaultPassword()) {
        return;
    }
    if (!await confirmSSHPublicKey(provisionEnv)) {
        return;
    }
    if (!await confirmLocalDevHost(provisionEnv)) {
        return;
    }

    if (provisionEnv == 'local') {
        await startLocal();
    }

    switch (action) {
        case ProvisionAction.Full:
            await init(provisionEnv);
            ping(provisionEnv);
            await setup(provisionEnv, repackage);
            break;
        case ProvisionAction.Deploy:
            await deploy(provisionEnv, repackage);
            break;
        case ProvisionAction.Init:
            await init(provisionEnv);
            await ping(provisionEnv);
            break;
        case ProvisionAction.Setup:
            await setup(provisionEnv, repackage);
            break;
        case ProvisionAction.Ping:
            ping(provisionEnv);
            break;
    }
};

export default provision;
