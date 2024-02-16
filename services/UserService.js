const Models = require('../models/sequelize');

class UserService {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createUser({ firstName, lastName, email, password }) {
    try {
      const user = await this.models.User.create({
        firstName,
        lastName,
        email,
        password,
      });

      return user;
    } catch (err) {
      return err;
    }
  }

  async getAllUsersAttributes() {
    try {
      const users = await this.models.User.findAll({
        // attributes: ['firstName', 'lastName', 'email'],
        attributes: { exclude: ['password'] },
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async findOneUser() {
    try {
      const user = await this.models.User.findOne({
        where: { firstName: 'Vira' },
      });
      return user;
    } catch (err) {
      return err;
    }
  }

  async findOneByPk() {
    try {
      const pk = 'b0f95a20-ca75-11ee-ba38-b1fc9f71bec8';
      const user = await this.models.User.findByPk(pk);
      return user;
    } catch (err) {
      return err;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.models.User.findAll({
        include: [
          {
            model: this.models.ContactInfo,
            attributes: { exclude: ['updatedAt', 'createdAt', 'UserUuid'] },
          },
          {
            model: this.models.Tweet,
            attributes: { exclude: ['updatedAt', 'UserUuid'] },
          },
        ],
        attributes: { exclude: ['updatedAt', 'createdAt'] },
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async getAllUsersWhere() {
    try {
      const users = await this.models.User.findAll({
        where: { firstName: 'Oleg' },
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async updateUser() {
    try {
      await this.models.User.update(
        { lastName: 'lastName changed' },
        { where: { firstName: 'Igor' } }
      );
      return 'updated User';
    } catch (err) {
      return err;
    }
  }

  async deleteUser() {
    try {
      const user = await this.models.User.destroy({
        where: { uuid: '78320b20-cb28-11ee-9118-03db56d28ca0' },
      });

      // const user = await this.models.User.destroy({
      //   where: { uuid: '78320b20-cb28-11ee-9118-03db56d28ca0' },
      //   force: true // to hard-deletion to actually delete data
      // });
      return 'deleted User';
    } catch (err) {
      return err;
    }
  }

  async restoreUser() {
    try {
      const user = await this.models.User.restore({
        where: { uuid: '78320b20-cb28-11ee-9118-03db56d28ca0' },
      });

      return 'restored user';
    } catch (err) {
      return err;
    }
  }

  async followUser() {
    try {
      const currentUser = await this.findOneUser();
      const toFollowUser = await this.models.User.findOne({
        where: { firstName: 'Igor' },
      });
      currentUser.addUser(toFollowUser);
      return currentUser.getUser();
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserService;
