import { Router, static as serveStatic } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';

let dirPrefix = resolve(__dirname, '../dist');

if (!existsSync(dirPrefix)) {
    dirPrefix = resolve(__dirname, '..');
}

const clientDir = resolve(__dirname, `${dirPrefix}/client`);
const indexFilePath = resolve(clientDir, 'index.html');

export const ClientRouter = Router();

ClientRouter.use(
    serveStatic(clientDir, { redirect: false }),
    (req, res) => {
        res.sendFile(indexFilePath);
    }
);