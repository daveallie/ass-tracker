const axios = require("axios").default;
const {getTandaApiToken} = require("./auth");

const getUsers = req =>
    axios.get("https://my.tanda.co/api/v2/users", {
      headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
    }).then(response => response.data);

const getAssets = req =>
    axios.get("https://my.tanda.co/api/v2/platform/car", {
      headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
    }).then(response => response.data);

const getShift = (req, id) => {
  console.log("Getting shift", id);
  return axios
      .get("https://my.tanda.co/api/v2/shifts/" + id, {
        headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
      })
      .catch(error => console.log("Got shift error", error))
      .then(response => {
        console.log("Got shift", response.data);
        return response.data
      });
};

const getAsset = (req, id) => {
  console.log("Getting asset", id);
  return axios
      .get("https://my.tanda.co/api/v2/platform/car/" + id, {
        headers: {Authorization: `bearer ${getTandaApiToken(req)}`}
      })
      .catch(error => console.log("Got asset update error", error))
      .then(response => {
        console.log("Got asset", response.data);
        return response.data;
      });
};

const updateAsset = (req, id, asset) => {
  console.log("Updating asset", id, asset);
  return axios
      .put("https://my.tanda.co/api/v2/platform/car/" + id,
          asset,
          {
            headers: {Authorization: `bearer ${getTandaApiToken(req)}`}
          },
      )
      .catch(error => console.log("Got asset update error", error));
};

module.exports = {
  getUsers,
  getAssets,
  getAsset,
  updateAsset,
  getShift
};
