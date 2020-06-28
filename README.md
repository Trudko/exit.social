# twitter-exporter

## Development

### Dependencies

Make sure you have the following dependencies installed beforehand:

- [Node.js](https://nodejs.org/en/download/)
- [Typescript](https://www.typescriptlang.org/docs/tutorial.html#installing-typescript)
- [tmux](https://github.com/tmux/tmux/wiki/Installing) (optional - CLI start)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) (optional) - Vagrant boxes
- [Vagrant](https://www.vagrantup.com/downloads.html) (optional) - Vagrant boxes

### Installation

Run `npm i` to prepare the environment.

#### Server

Copy `.env.development.dist` to `.env.development` and add or replace all relevant properties. If you don't plan to use Vagrant box with MongoDB (`server/vagrant`)
don't forget to replace `DATABASE_` related properties as well.

Server comes with Vagrant box for local MongoDB (so you don't have to set it up yourself). If you plan to use it, make sure [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
as well as [Vagrant](https://www.vagrantup.com/downloads.html) is installed on your system. You can use `*.sh` scripts in `server/vagrant` to manage the box or use included CLI
for management.

#### View

Development: Copy `.env.development.dist` to `.env.development` and add or replace all relevant properties.

### Usage

#### Via CLI

Run `./cli.sh` as your entry point. This will run an interactive tool to help you manage the development as well as provisioning of the project.

Additionally, it is also possible to run the tool with specific arguments to start specific task without the user interaction (useful for CI).
To see the available commands run `./cli.sh help`.

##### For Windows 10 users:

To be able to use features of CLI and others, it is recommended to [Enable Developer Mode](https://www.howtogeek.com/292914/what-is-developer-mode-in-windows-10/)
and use Ubuntu Bash on Windows 10.

#### Via NPM

You can use `package.json` scripts to manage the project from the root folder. Use `yarn start` to run the whole project or `yarn start:view`/`yarn start:server`/`yarn start:server:dev` to run parts of the project separately.

## Production

It is recommended to use CLI tool to create production ready packages but if you prefer yarn scripts, see `package.json`.

To create production packages (either in your CI environment or locally) run:

`cli.sh build` - to build the project
`VERSION={version:1.0.0} ./cli.sh package` - to package the project into `/dist` directory

### Server

After packaging `/dist` will contain Linux binary file (`twitter-exporter-server-{version}.bin`) for running the server.
To be able to run it and/or to configure it you have to provide `.env.production` file which needs to be in the same directory as the binary file when running it.
You can use `server/.env.production.template` file and replace the variables with your production values.

### View

Make sure to move `/view/.env.production.template` to `/view/.env.production` and add the `REACT_APP_API_URL` variable into it before building the project.

After packaging `/dist` will contain ZIP file (`twitter-exporter-view-{version}.zip`) containing static files for View, which you can deploy them to desired location.
