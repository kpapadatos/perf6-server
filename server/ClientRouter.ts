import { Router, static as serveStatic } from 'express';
import { resolve } from 'path';

export const ClientRouter = Router();

ClientRouter.use(
    serveStatic('dist/client', { redirect: false }),
    (req, res) => {
        res.sendFile(resolve(__dirname, '../dist/client/index.html'));
    }
);