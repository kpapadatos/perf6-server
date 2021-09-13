import { Router } from 'express';
import { ClientRouter } from './ClientRouter';

export class Perf6Server {
    public Router = Router();
    constructor() {
        const APIRouter = Router();

        this.Router.use('/perf6/app', ClientRouter);
        this.Router.use('/perf6/api', APIRouter);
    }
}

