class Transporter{
    constructor(){

    }
    getTransporter(){
        let transporter = {
            service: 'gmail', 
            auth: {
                user: "USER",
                pass: "PASSWORD"
            }
        };
        return transporter;
    }
}

module.exports = new Transporter();