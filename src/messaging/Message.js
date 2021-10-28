const configEnv = require('../config/config');

const client = require('twilio')(configEnv.TWILIO_SID, configEnv.TWILIO_TOKEN);



class Message{
    constructor(TWILIO_SID,TWILIO_TOKEN){
        
    }
    sendMessageWhatsapp(body, to){
        
        client.messages.create({
            body: body,
            //mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491140344463'
            })
      .then(message => console.log(message.sid))
      .catch(console.log)
        /*twilioClient.messages.create({
                body: body,            
                from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
                to: `whatsapp:${process.env.TWILIO_PHONE_ADMIN}`
                })
        .then(message => console.log(message.sid))
        .catch(console.log) */
    }

}
module.exports = Message;