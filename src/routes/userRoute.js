import Router from 'express';
import user from '../controllers/userController';
import paginate from '../middlewares/paginateMiddleware';
import { validateSaveUser, validateUpdateUser } from '../middlewares/schemaMiddleware';

const famerRouter = Router();
famerRouter
  .delete('/delete-user/:id', user.deleteUser)
  .post('/save-user', validateSaveUser, user.saveUser)
  .get('/view-users', user.viewUsers, paginate.paginateData)
  .patch('/update-user/:id', validateUpdateUser, user.updateUser);

export default famerRouter;
