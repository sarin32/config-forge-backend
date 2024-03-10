import * as KoaRouter from '@koa/router';
import userRouter from './user.route';
import projectRouter from './project.route';
import environmentRouter from './environment.route';
import variableRouter from './variable.route';

const router = new KoaRouter();

// extend routes here
router.use(userRouter.routes());
router.use(projectRouter.routes());
router.use(environmentRouter.routes());
router.use(variableRouter.routes());

export default router;
