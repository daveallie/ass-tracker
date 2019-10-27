const express = require("express");
const {getShift, getAsset, updateAsset} = require("../tanda/client");
const {triggerClientsUpdate} = require("../util/websockets");

const router = express.Router();

const processShiftStart = (req, shift_id, user_id) => {
  getShift(req, shift_id).then(shift => {
    const asset_id = shift.tag;
    const asset = {
      car_in_use: true,
      last_user_id: user_id
    };
    updateAsset(req, asset_id, asset);
  })
};

const processShiftEnd = (req, shift_id) => {
  getShift(req, shift_id)
      .then(shift => {
        const asset_id = shift.tag;
        if (asset_id === null)
          throw Error("No asset ID!!");
        const shiftTimeSecs = shift.finish - shift.start;
        const shiftTimeHr = Math.round(shiftTimeSecs === 0 ? 0 : shiftTimeSecs / 60 / 60);
        console.log("Asset used for " + shiftTimeHr + " hours");
        getAsset(req, asset_id)
            .then(asset => {
              const assetData = {
                car_in_use: false,
                last_user_id: shift.user_id,
                hours_since_last_service: asset.hours_since_last_service + shiftTimeHr,
                total_hours_of_use: asset.total_hours_of_use + shiftTimeHr
              };
              updateAsset(req, asset_id, assetData);
            })
      })
      .catch(e => console.log(e));
};

const processCheckinUpdate = (req, body) => {
  const shift_id = body.shift_id;
  const user_id = body.user_id;

  switch (body.type) {
    case "start":
      processShiftStart(req, shift_id, user_id);
      break;
    case "finish":
      processShiftEnd(req, shift_id);
      break;
  }
};

router.post('/', (req, res) => {
  console.log("Got webhook", req.body);

  const payload = req.body.payload;
  const topic = payload.topic;

  switch (topic) {
    case "platform_record.updated":
      triggerClientsUpdate();
      break;
    case "clockin.updated":
      processCheckinUpdate(req, payload.body);
      break;
  }
  res.end();
});

module.exports = router;
