const { frontendUrl } = require("./path");

const cookieName = "authCookie";
const cookieValue = "my-cookie-value";

const getAuthCookieValue = req =>
  (req.cookies && req.cookies[cookieName])
    ? req.cookies[cookieName]
    : null;

const isAuthed = req => getAuthCookieValue(req) === cookieValue;
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
  getAuthCookieValue,
  cookieName,
  cookieValue
};
