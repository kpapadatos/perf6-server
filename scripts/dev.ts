import { spawn, spawnSync } from 'child_process';
import { resolve } from 'path';

const NPM_CMD = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
const projectRoot = resolve(__dirname, '..');

console.log('Cleaning...');
spawnSync(NPM_CMD, ['run', 'clean']);

const watch = spawn('tsc', ['-w', '--pretty'], {
    cwd: resolve(projectRoot, 'server'),
    shell: true
});

watch.stdout.on('data', chunkHandler);
watch.stdout.pipe(process.stdout);

function chunkHandler(chunk: Buffer) {
    if (chunk.toString().match('0 errors')) {
        spawn(NPM_CMD, ['run', 'nodemon'], { cwd: projectRoot, stdio: 'inherit' });

        watch.stdout.off('data', chunkHandler);
    }
}