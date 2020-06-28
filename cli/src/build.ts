import {existsSync, readFileSync} from 'fs';
import inquirer from 'inquirer';
import shell from 'shelljs';
import {getModuleName, runUnsafeScript} from './utils';

const extractVariables = (templateFile: string) => {
    const template = readFileSync(templateFile).toString();
    const regex = /=\${?([A-Za-z0-9_]+)}?/g;
    let match = regex.exec(template);
    const variables = [];

    while (match) {
        variables.push(match[1]);
        match = regex.exec(template);
    }

    return variables;
};

const tryLoadVariables = async (moduleDir) => {
    if (!existsSync(`${moduleDir}/package.json`)) {
        return {};
    }

    const packageInfo = JSON.parse(readFileSync(`${moduleDir}/package.json`).toString());
    const buildEnvTemplate = packageInfo.buildEnvTemplate;
    if (!buildEnvTemplate) {
        return {};
    }

    const templateFile = `${moduleDir}/${buildEnvTemplate}`;
    if (!existsSync(templateFile)) {
        return {};
    }

    if (existsSync(`${moduleDir}/.env.production`)) {
        const {useEnvProduction} = await inquirer.prompt({
            type: 'confirm',
            name: 'useEnvProduction',
            message: `.env.production file exists for ${getModuleName(moduleDir)} module. Do you want to use it?`
        });
        if (useEnvProduction) {
            return {};
        }
    }

    const variables = extractVariables(templateFile);
    if (variables.length == 0) {
        return {};
    }

    shell.echo(`Enter values for environment variables needed for ${getModuleName(moduleDir)} module build:`);
    // TODO: save history for reuse
    return inquirer.prompt(variables.map(variable => ({
        type: 'input',
        name: variable,
        message: variable
    })));
};

const buildModule = async moduleDir => {
    const variables = await tryLoadVariables(moduleDir);
    const variableList = Object.keys(variables).reduce((list, variable) => `${list} ${variable}=${variables[variable]}`, '');
    await runUnsafeScript(moduleDir, `${variableList} npm run build`, `Building ${getModuleName(moduleDir)} module...`);
};

const build = async (modules: string[]) => {
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        await buildModule(module);
    }
};
export default build;
