const express = require("express");
const { authMiddleware } = require("../util/auth");

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ test: 1 }));
});

module.exports = router;
