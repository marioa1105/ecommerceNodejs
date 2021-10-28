const path = require('path');
const dotenv = require('dotenv');
console.log(path.resolve(process.cwd(), process.env.NODE_ENV + '.env'));
dotenv.config({
    path:path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});

module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.SMTP_EMAIL = process.env.SMTP_EMAIL || '';
module.exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD ||  ''
module.exports.SMTP_FROM = process.env.SMTP_FROM || ''
module.exports.EMAIL_ADMIN = process.env.EMAIL_ADMIN || ''
module.exports.TWILIO_SID = process.env.TWILIO_SID || ''
module.exports.TWILIO_TOKEN = process.env.TWILIO_TOKEN || ''
module.exports.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || ''
module.exports.TWILIO_PHONE_ADMIN = process.env.TWILIO_PHONE_ADMIN || ''
