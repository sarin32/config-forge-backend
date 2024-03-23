import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {createEnvironment} from '../controllers/environment/environment.controller';

const router = new KoaRouter({
  prefix: '/environment',
});

router.use(tokenMiddleware);

router.post('/create', tokenMiddleware, createEnvironment);

export default router;
