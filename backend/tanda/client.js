const axios = require("axios").default;
const { uniq } = require("lodash");
const { getTandaApiToken } = require("./auth");

const getAllUsers = req => {
  axios.get("https://my.tanda.co/api/v2/users", {
    headers: { Authorization: `bearer ${getTandaApiToken(req) }` },
  })
    .then(response => response.data)
};

const getAssetList = req =>
  axios.get("https://my.tanda.co/api/v2/platform/car", {
    headers: { Authorization: `bearer ${getTandaApiToken(req) }` },
  })
    .then(response => response.data)
    .then(data => {
      // const userIdsToPull = uniq(data.map(asset => asset.lastUserId).map(id => id.toString()).filter(id => id));
      return data
    });

module.exports = {
  getAssetList
};
