import {getModuleName, runUnsafeScript} from './utils';

const checkModule = async moduleDir => await runUnsafeScript(moduleDir, 'npm run check', `Checking ${getModuleName(moduleDir)} module...`);

const check = async (modules: string[]) => {
    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        await checkModule(module);
    }
};
export default check;
