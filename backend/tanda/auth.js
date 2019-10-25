const { getAuthCookieValue, cookieValue } = require("../util/auth");

const getToken = cookie => {
  if (cookie === cookieValue) {
    return process.env.TANDA_API_TOKEN;
  }
  return null;
};

const getTandaApiToken = req => {
  return getToken(getAuthCookieValue(req));
};

module.exports = {
  getTandaApiToken,
};
