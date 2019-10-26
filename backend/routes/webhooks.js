const express = require("express");
const {getShift, getAsset, updateAsset} = require("../tanda/client");
const {triggerClientsUpdate} = require("../util/websockets");

const router = express.Router();

router.post('/', (req, res) => {
  console.log("Got data!", req.body);

  const payload = req.body.payload;

  if (payload.topic === 'platform_record.updated') {
    triggerClientsUpdate()

  } else if (payload.topic === "clockin.updated") {
    const shift_id = payload.body.shift_id;
    const shift_type = payload.body.type;
    const user_id = payload.body.user_id;

    if (shift_type === 'start') {
      getShift(req, shift_id).then(shift => {
        console.log("Got shift", shift);
        const asset_id = shift.tag;
        const asset = {
          car_in_use: true,
          last_user_id: user_id
        };
        return updateAsset(req, asset_id, asset);
      })

    } else if (shift_type === 'finish') {

      getShift(req, shift_id).then(shift => {
        console.log("Got shift", shift);
        const asset_id = shift.tag;
        if (asset_id === null)
          throw Error("No shift ID!!");
        const shiftTimeSecs = shift.finish - shift.start;
        const shiftTimeHr = shiftTimeSecs === 0 ? 0 : shiftTimeSecs / 60 / 60;
        return {
          userId: shift.user_id,
          assetId: asset_id,
          shiftTime: shiftTimeHr
        };
      }).then(shiftData =>
          getAsset(req, shiftData.assetId).then(asset => {
            console.log("Got asset", asset);
            const assetData = {
              car_in_use: false,
              last_user_id: shiftData.userId,
              hours_since_last_service: asset.hours_since_last_service + shiftData.shiftTime,
              total_hours_of_use: asset.total_hours_of_use + shiftData.shiftTime
            };
            return updateAsset(req, shiftData.assetId, assetData);
          })).catch(e => console.log(e));

      getShift(req, shift_id).then(shift => {
        const asset_id = shift.tag;
        const shiftTimeMin = shift.finish - shift.start;
        const shiftTimeHr = shiftTimeMin === 0 ? 0 : shiftTimeMin / 60;
        const asset = {
          car_in_use: false,
          hours_since_last_service: +shiftTimeHr,
          total_hours_of_use: +shiftTimeHr
        };
        updateAsset(req, asset_id, asset);
      });
    }
  }
  res.end();
});

module.exports = router;
