const axios = require("axios").default;
const { getTandaApiToken } = require("./auth");

const getAssetList = req =>
  axios.get("https://my.tanda.co/api/v2/platform/car", {
    headers: { Authorization: `bearer ${getTandaApiToken(req) }` },
  });

module.exports = {
  getAssetList
};
