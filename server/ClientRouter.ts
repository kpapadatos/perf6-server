import { Router, static as serveStatic } from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';

let indexFilePath = resolve(__dirname, '../dist/client/index.html');

if (!existsSync(indexFilePath)) {
    indexFilePath = resolve(__dirname, '../client/index.html');
}

export const ClientRouter = Router();

ClientRouter.use(
    serveStatic('dist/client', { redirect: false }),
    (req, res) => {
        res.sendFile(indexFilePath);
    }
);