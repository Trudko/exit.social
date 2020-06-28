import {getModuleName, runUnsafeScript} from './utils';

const testModule = async moduleDir => await runUnsafeScript(moduleDir, 'CI=true npm run test', `Running tests for ${getModuleName(moduleDir)} module...`);

const test = async (modules: string[]) => {
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        await testModule(module);
    }
};
export default test;
