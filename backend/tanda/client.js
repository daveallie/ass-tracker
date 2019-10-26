const axios = require("axios").default;
const _ = require("lodash");
const {getTandaApiToken} = require("./auth");

const getAllUsers = req =>
    axios.get("https://my.tanda.co/api/v2/users", {
      headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
    }).then(response => response.data);

const getAssets = req =>
    axios.get("https://my.tanda.co/api/v2/platform/car", {
      headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
    }).then(response => response.data);

const getAssetList = req => Promise.all([getAssets(req), getAllUsers(req)]).then(([assets, allUsers]) => {

  const userIdsToPull = _.uniq(assets.map(asset => asset.last_user_id).filter(id => id != null));

  const relevantUsers = _.filter(allUsers, user => _.includes(userIdsToPull, user.id));

  const userMap = _.keyBy(relevantUsers, user => user.id);

  _.forEach(assets, asset => asset['user'] = userMap[asset.last_user_id]);

  return assets;
});

const getShift = (req, shiftId) => {
  console.log("Getting shift", shiftId);
  return axios
      .get("https://my.tanda.co/api/v2/shifts/" + shiftId, {
        headers: {Authorization: `bearer ${getTandaApiToken(req)}`},
      })
      .catch(error => console.log("Got shift error", error))
      .then(response => response.data);
};

const markAssetInUse = (req, assetId, inUse) =>
    axios
        .put("https://my.tanda.co/api/v2/platform/car/" + assetId, {
              'car_in_use': inUse
            },
            {
              headers: {Authorization: `bearer ${getTandaApiToken(req)}`}
            },
        )
        .catch(error => console.log("Got shift error", error));

module.exports = {
  getAssetList,
  getShift,
  markAssetInUse
};
