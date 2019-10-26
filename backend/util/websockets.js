const Pusher = require('pusher');

const appId = 887989;
const key = process.env.PROD_PUSHER_KEY;
const secret = process.env.PROD_PUSHER_SECRET;

const channelsClient = new Pusher({
  appId,
  key,
  secret,
  cluster: 'ap4',
  useTLS: true
});

const triggerClientsUpdate = () => {
  channelsClient.trigger('frontend', 'reload', {});
};

module.exports = {
  triggerClientsUpdate,
};

