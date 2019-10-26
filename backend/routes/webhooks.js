const express = require("express");
const { getShift, markAssetInUse } = require("../tanda/client");

const router = express.Router();

router.post('/', (req, res) => {
  console.log("Got data!", req.body);

  const payload = req.body.payload;

  const toggleAssert = (shift_id, inUse) =>
    getShift(req, shift_id)
        .then(shift => {
          console.log("Got shift", shift);
          return shift.tag
        })
        .then(tag => markAssetInUse(req, tag, inUse));

  if (payload.topic === "clockin.updated") {
    const shift_id = payload.body.shift_id;
    const shift_type = payload.body.type;

    if (shift_type === 'start') {
      toggleAssert(shift_id, true);
    } else if (shift_type === 'finish') {
      toggleAssert(shift_id, false);
    }

    //todo update last_user and usage time
  }
  res.end();
});

module.exports = router;
