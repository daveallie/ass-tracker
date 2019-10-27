const express = require("express");
const _ = require("lodash");
const {authMiddleware} = require("../util/auth");
const {getAssets, getUsers} = require("../tanda/client");

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({}));
});

router.get('/assets', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const userMap = getUsers(req).then(users => _.keyBy(users, user => user.id));

  Promise
      .all([userMap, getAssets(req)])
      .then(([userMap, assets]) => {
        return _.chain(assets).forEach(asset => asset['user'] = userMap[asset.last_user_id]).value();
      })
      .catch(e => {
        console.error("Error grabbing combined assets", e);
        return {error: process.env.NODE_ENV === "production" ? "Error!" : e};
      })
      .then(jsonData => res.end(JSON.stringify(jsonData)));
});

module.exports = router;
