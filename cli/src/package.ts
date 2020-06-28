import shell from 'shelljs';
import {BASE_DIR, getModuleName, runUnsafeScript} from './utils';

const DEST_DIR = `${BASE_DIR}/dist`;
const VERSION = process.env.VERSION || '1.0.0';

const packageModule = async moduleDir => {
    await runUnsafeScript(moduleDir, `DEST_DIR=${DEST_DIR} VERSION=${VERSION} npm run package`, `Packaging ${getModuleName(moduleDir)} module...`);
};

const packageModules = async (modules: string[]) => {
    shell.rm('-rf', DEST_DIR);
    await shell.mkdir(DEST_DIR);

    for (let index = 0; index < modules.length; index++) {
        const module = modules[index];
        await packageModule(module);
    }
};

export default packageModules;
