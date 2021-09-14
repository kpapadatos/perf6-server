import { Router, static as serveStatic } from 'express';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

let dirPrefix = resolve(__dirname, '../dist');

if (!existsSync(dirPrefix)) {
    dirPrefix = resolve(__dirname, '..');
}

const clientDir = resolve(__dirname, `${dirPrefix}/client`);
const indexFilePath = readFileSync(resolve(clientDir, 'index.html')).toString();

export const ClientRouter = Router();

ClientRouter.use(
    serveStatic(clientDir, { redirect: false }),
    (req, res) => {
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send(indexFilePath);
    }
);