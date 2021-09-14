import express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import request from 'supertest';
import { Perf6Server } from '../server/Perf6Server';

describe('server', () => {
    const indexFile = readFileSync(resolve(__dirname, '../dist/client/index.html'));
    const faviconFile = readFileSync(resolve(__dirname, '../dist/client/favicon.ico'))
    const app = express();
    app.use('/perf6', new Perf6Server().Router);

    it('should serve default page', done => {
        request(app)
            .get('/perf6/app')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .expect(indexFile.toString(), done);
    });
    it('should serve static files', done => {
        request(app)
            .get('/perf6/app/favicon.ico')
            .expect('Content-Type', 'image/x-icon')
            .expect(200)
            .expect(faviconFile, done)
    });
    it('should serve as spa', done => {
        request(app)
            .get('/perf6/app/spa/route')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .expect(indexFile.toString(), done)
    });
});