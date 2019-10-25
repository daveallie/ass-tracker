const express = require("express");
const { cookieName, generateCookie, isAuthed, frontendUrl } = require("../util/auth");

const router = express.Router();

router.post('/login', (req, res) => {
  if (!isAuthed(req)) {
    res.cookie(cookieName, generateCookie());
  }

  res.redirect(`${frontendUrl}/`);
});

router.post('/logout', (req, res) => {
  res.clearCookie(cookieName);
  res.redirect('/');
});

module.exports = router;
