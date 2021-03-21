import models from '../database/models';

const { User } = models;

class UserHelper {
  static async userExist(attribute, value) {
    const viewedData = await User.findOne({ where: { [attribute]: value } });
    return viewedData;
  }

  static async viewAllUsers() {
    const viewedData = await User.findAll({ order: [['updatedAt', 'DESC']]});
    return viewedData;
  }

  static async viewUsers(skip, start) {
    const viewedData = await User.findAndCountAll({
      limit: skip,
      offset: start,
      order: [['updatedAt', 'DESC']],
    });
    return viewedData;
  }

  static async saveUser(body) {
    await User.create({
      name: body.name,
      phone: body.phone,
      dob: body.dob,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const viewedData = await this.viewAllUsers();
    return viewedData;
  }

  static async updateUser(body, id) {
    await User.update({
      name: body.name,
      phone: body.phone,
      dob: body.dob,
    }, { where: { id },
    });

    const viewedData = await this.viewAllUsers();
    return viewedData;
  }

  static async deleteUser(id) {
    await User.destroy({ where: { id } });

    const viewedData = await this.viewAllUsers();
    return viewedData;
  }
}

export default UserHelper;
