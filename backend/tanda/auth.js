const { getAuthCookieValue, cookieValue } = require("../util/auth");

const getToken = cookie => {
  // if (cookie === cookieValue) {
    return process.env.TANDA_API_TOKEN;
  // }
  // return null;
};

const getTandaApiToken = req => {
  let token = getToken(getAuthCookieValue(req));
  console.log("Got token", token);
  return token;
};

module.exports = {
  getTandaApiToken,
};
