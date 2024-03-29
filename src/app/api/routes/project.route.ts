import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {
  createProject,
  getProjectDataInDetail,
  getProjectlist,
  updateProjectDetails,
} from '../controllers/project/project.controller';

const router = new KoaRouter({
  prefix: '/project',
});

router.use(tokenMiddleware);

router.post('/create', createProject);

router.post('/edit', updateProjectDetails);

router.post('/getList', getProjectlist);

router.post('/getDataInDetail', getProjectDataInDetail);

export default router;
