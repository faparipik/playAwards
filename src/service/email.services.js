import formData from 'form-data';
import Mailgun from 'mailgun.js';

import config from '../config/config.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: 'api',
  key: config.mailgunApiKey,
});

const messageData = {
  from: 'Play Awards <zevs.zevs9@gmail.com>',
};

const sendEmail = (email, text, subject) => {
  client.messages
    .create(config.mailgunDomain, { ...messageData, text, subject, to: email })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

export default {
  sendEmail,
};
