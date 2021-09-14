import { Router, static as serveStatic } from 'express';
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { defer } from './common/defer';
import { IPerf6ServerOptions } from './interfaces';

export class Perf6Server {
    public Router = Router();
    private ClientRouter = Router();
    private APIRouter = Router();
    private options = { appBaseUrl: '/' } as IPerf6ServerOptions;
    constructor(options?: Partial<IPerf6ServerOptions>) {
        Object.assign(this.options, options);
        this.initClientRouter();
        this.Router.use('/app', this.ClientRouter);
        this.Router.use('/api', this.APIRouter);
    }
    private async initClientRouter() {
        const { resolve, promise: ready } = defer();

        let dirPrefix = resolvePath(__dirname, '../dist');

        if (!await this.exists(dirPrefix)) {
            dirPrefix = resolvePath(__dirname, '..');
        }

        const clientDir = resolvePath(__dirname, `${dirPrefix}/client`);

        this.ClientRouter.use(
            serveStatic(clientDir, { redirect: false }),
            async (req, res) => {
                await ready;
                res.set('Content-Type', 'text/html; charset=utf-8');
                res.send(indexFile.replace('<base href="/">', `<base href="${this.options.appBaseUrl}">`));
            }
        );

        const indexFile = (await fs.readFile(resolvePath(clientDir, 'index.html'))).toString();

        resolve();
    }
    private async exists(path: string) {
        try {
            await fs.stat(path)
            return true;
        } catch {
            return false;
        }
    }
}

