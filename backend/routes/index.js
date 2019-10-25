const express = require("express");
const { authMiddleware } = require("../util/auth");
const { getAssetList } = require("../tanda/client");

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  getAssetList(req)
    .then(resp => resp.data)
    .catch(e => ({ error: e }))
    .then(jsonData => res.end(JSON.stringify(jsonData)));
});

module.exports = router;
