import * as KoaRouter from '@koa/router';
import { tokenMiddleware } from '../middlewares';
import { createVariable } from '../controllers/variable/variable.controller';

const router = new KoaRouter({
  prefix: '/variable',
});

router.use(tokenMiddleware);

router.post('/create', tokenMiddleware, createVariable);

export default router;
