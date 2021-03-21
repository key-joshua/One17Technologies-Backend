import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, NOT_FOUND, BAD_REQUEST, OK } from 'http-status';
import paginateHelper from '../Helpers/paginateHelper';
import responseHelper from '../Helpers/responseHelper';
import userHelper from '../Helpers/userHelper';

class FarmerController {
  static async viewUsers(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await paginateHelper.paginateData(req.query);
      const data = await userHelper.viewUsers(skip, start);

      const allDatata = data.rows;
      const countAllData = data.count;

      if (data.rows.length < 1) {
        responseHelper.handleError(NOT_FOUND, `Users not found at the moment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      return next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async saveUser(req, res) {
    try {
      let data = await userHelper.userExist('phone', req.body.phone);
      if (data) {
        responseHelper.handleError(BAD_REQUEST, `User with ${req.body.phone} already exist`);
        return responseHelper.response(res);
      }

      data = await userHelper.saveUser(req.body);
      if (data.length > 0) {
        responseHelper.handleSuccess(OK, 'User added successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async updateUser(req, res) {
    try {
      let data = await userHelper.userExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `User with id ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      data = await userHelper.updateUser(req.body, req.params.id);
      if (data) {
        responseHelper.handleSuccess(OK, 'User updated successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  static async deleteUser(req, res) {
    try {
      let data = await userHelper.userExist('id', req.params.id);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, `User with id ${req.params.id} not found`);
        return responseHelper.response(res);
      }

      data = await userHelper.deleteUser(req.params.id);
      if (data) {
        responseHelper.handleSuccess(OK, 'User deleted successfully', data);
        return responseHelper.response(res);
      }

      responseHelper.handleError(SERVICE_UNAVAILABLE, 'Something wrong occured, please try again');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default FarmerController;
