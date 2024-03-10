import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {createProject} from '../controllers/project.controller';

const router = new KoaRouter({
  prefix: '/project',
});

router.use(tokenMiddleware);

router.post('/create', tokenMiddleware, createProject);

export default router;
