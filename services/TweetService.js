const Models = require('../models/sequelize');

class TweetService {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createTweet(UserUuid, title, description) {
    try {
      const tweet = await this.models.Tweet.create({
        UserUuid,
        title,
        description,
      });

      return tweet;
    } catch (err) {
      return err;
    }
  }

  async getAllTweets() {
    try {
      const allTweets = await this.models.Tweet.findAll({
        include: {
          model: this.models.User,
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'password', 'deletedAt'],
          },
        },
        attributes: { exclude: ['updatedAt', 'UserUuid'] },
      });
      return allTweets;
    } catch (err) {
      return err;
    }
  }
}

module.exports = TweetService;
