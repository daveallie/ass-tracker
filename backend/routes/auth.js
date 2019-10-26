const express = require("express");
const { cookieName, generateCookie, isAuthed } = require("../util/auth");
const { frontendUrl } = require("../util/path");

const router = express.Router();

router.post('/login', (req, res) => {
  if (!isAuthed(req)) {
    res.cookie(cookieName, generateCookie());
  }

  res.end();
});

router.post('/logout', (req, res) => {
  res.clearCookie(cookieName);
  res.end();
});

module.exports = router;
