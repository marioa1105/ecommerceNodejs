const accountSid = 'AC90f142822b66c569ce2e95e50948d89b';
const authToken = 'ad0815c47b6ffcbc38d2b33f484c931b';

const client = require('twilio')(accountSid, authToken);



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