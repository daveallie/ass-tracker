const express = require("express");
const { authMiddleware } = require("../util/auth");
const { getAssetList } = require("../tanda/client");

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  getAssetList(req)
    .catch(e => {
      console.error(e);
      return { error: process.env.NODE_ENV === "production" ? "Error!" : e };
    })
    .then(jsonData => res.end(JSON.stringify(jsonData)));
});

module.exports = router;
