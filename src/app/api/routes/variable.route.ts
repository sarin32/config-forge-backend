import * as KoaRouter from '@koa/router';
import {tokenMiddleware} from '../middlewares';
import {
  createVariable,
  deleteVariable,
  updateVariable,
} from '../controllers/variable/variable.controller';

const router = new KoaRouter({
  prefix: '/variable',
});

router.use(tokenMiddleware);

router.post('/create', createVariable);
router.post('/update', updateVariable);
router.post('/delete', deleteVariable);

export default router;
