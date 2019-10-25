const { frontendUrl } = require("./path");

const cookieName = "authCookie";
const cookieValue = "my-cookie-value";

const isAuthed = req => req.cookies && req.cookies[cookieName] === cookieValue;
const generateCookie = () => cookieValue;

const authMiddleware = (req, res, next) => {
  if (!isAuthed(req)) {
    res.redirect(302, `${frontendUrl}/login`);
    return;
  }

  next();
};

module.exports = {
  authMiddleware,
  isAuthed,
  generateCookie,
  cookieName
};
