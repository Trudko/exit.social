import shell from 'shelljs';

export enum VagrantAction {
    Start = 'Start',
    Stop = 'Stop',
    Destroy = 'Destroy'
}

const manage = (vagrantDir: string, action: VagrantAction) => {
    shell.pushd('-q', vagrantDir);

    try {
        switch (action) {
            case VagrantAction.Start:
                shell.echo('Starting Vagrant box...');
                shell.exec('vagrant up', {fail: true});
                break;
            case VagrantAction.Stop:
                shell.echo('Stopping Vagrant box...');
                shell.exec('vagrant stop', {fail: true});
                break;
            case VagrantAction.Destroy:
                shell.echo('Destroying Vagrant box...');
                shell.exec('vagrant destroy -f', {fail: true});
                break;
        }
    } finally {
        shell.popd('-q');
    }
};

export default manage;
