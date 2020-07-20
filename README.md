# exit.social
Exit.social is an application for gathering email addresses for Twitter followers. You share a link with custom message. After clicking your followers can input their email address, which you can then easily export. You can incentivize followers by payouts through ethereum (require metamask) or own incentives based on followers score. 

Score is based on number of followers. More followers user has more score she gets. 

You can try an app at [Exit.Social](https://exit.social/)

## Features
- gathering email address and ethereum address (for payouts) of your followers
- custom invite message
- affiliate link for your followers - each follower gets point for inviting new Twitter followers
- your community leaderboard - share who are your most active community members
- easy ethereum payouts(requires metamask), you can set how much is each point worth
- export to csv - compatible with [Ghost.org](https://ghost.org/)

## Development

### Dependencies
- [Node.js](https://nodejs.org/en/download/)
- [React.js](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/docs/tutorial.html#installing-typescript)
- [tmux](https://github.com/tmux/tmux/wiki/Installing) (optional - CLI start)
- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) (optional) - Vagrant boxes
- [Vagrant](https://www.vagrantup.com/downloads.html) (optional) - Vagrant boxes

### Installation

1. Clone the code
2. Run `npm i` to prepare the environment.
3. Copy `server/.env.development.dist` to `server/.env.development` and add or replace all relevant properties. If you don't plan to use Vagrant box with MongoDB (`server/vagrant`)
don't forget to replace `DATABASE_` related properties as well. Server comes with Vagrant box for local MongoDB (so you don't have to set it up yourself). If you plan to use it, make sure [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
as well as [Vagrant](https://www.vagrantup.com/downloads.html) is installed on your system. You can use `*.sh` scripts in `server/vagrant` to manage the box or use included CLI
for management.
4. Copy `view/.env.development.dist` to `view/.env.development` and add or replace all relevant properties.
5. Run `./cli.sh` as your entry point. This will run an interactive tool to help you manage the development as well as provisioning of the project.

Additionally, it is also possible to run the tool with specific arguments to start specific task without the user interaction (useful for CI).
To see the available commands run `./cli.sh help`.

#### For Windows 10 users:

To be able to use features of CLI and others, it is recommended to [Enable Developer Mode](https://www.howtogeek.com/292914/what-is-developer-mode-in-windows-10/)
and use Ubuntu Bash on Windows 10.

#### Via NPM

You can use `package.json` scripts to manage the project from the root folder. Use `yarn start` to run the whole project or `yarn start:view`/`yarn start:server`/`yarn start:server:dev` to run parts of the project separately.

## Production

It is recommended to use CLI tool to create production ready packages but if you prefer yarn scripts, see `package.json`.

To create production packages (either in your CI environment or locally):

1. run `cli.sh build` - to build the project `VERSION={version:1.0.0} ./cli.sh package` - to package the project into `/dist` directory
2. run `cli.sh package` - to package the project. After packaging `/dist` will contain Linux binary file (`twitter-exporter-server-{version}.bin`) for running the server and `twitter-exporter-view-{version}.zip` with static files for View
3. Copy `server/.env.production.template` to `.env.production`. The file needs to be in the same directory as the binary file when running it.
4. Copy `/view/.env.production.template` to `/view/.env.production` and add the `REACT_APP_API_URL` variable into it before building the project.
