import * as KoaRouter from '@koa/router';
import userRouter from './user.route';

const router = new KoaRouter();

// extend routes here
router.use(userRouter.routes());

export default router;
