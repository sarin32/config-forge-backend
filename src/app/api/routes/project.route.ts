import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {
  createProject,
  getProjectlist,
  updateProjectDetails,
} from '../controllers/project.controller';

const router = new KoaRouter({
  prefix: '/project',
});

router.use(tokenMiddleware);

router.post('/create', createProject);

router.post('/edit', updateProjectDetails);

router.post('/getList', getProjectlist);

export default router;
