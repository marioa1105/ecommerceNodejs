const nodemailer = require('nodemailer');
const transporter = require('./Transporter');
class Mailer{
    constructor(smtpMail, smtpPassword,smtpFrom){        
        this.smtpFrom = smtpFrom;
        let objTransport = transporter.getTransporter();
        objTransport.auth.user = smtpMail;
        objTransport.auth.pass = smtpPassword;
        this.transporter = nodemailer.createTransport(objTransport);
    }
    sendMail(to, subject, html){
        let mailOption = {
            from: this.smtpFrom,
            to: to,
            subject: subject,
            html: html
        };

        this.transporter.sendMail(mailOption, (err,info)=>{
            if(err){
                console.log("Sendmail " + err);
                return;
            }
            console.log(info);
        })

    }
}

module.exports = Mailer;