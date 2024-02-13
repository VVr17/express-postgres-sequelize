const express = require('express');
const router = express.Router();

const UserService = require('../../services/UserService');
// const ContactService = require('../../services/ContactService');

module.exports = config => {
  const userService = new UserService(config.postgres.client);
  // const contactService = new ContactService(config.postgres.client);

  router.get('/all', async (req, res) => {
    try {
      const user = await userService.getUser();
      res.send(user);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
