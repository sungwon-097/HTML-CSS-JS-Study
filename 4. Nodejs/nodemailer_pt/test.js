const { info } = require('console');
const nodemailer = require('nodemailer');
const email = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5e8ab2ee101673",
      pass: "2a0db20b787f5f"
    }
}
const send = async(option) => {
    nodemailer.createTransport(email).sendMail(option, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info);
            return info.response;
        }
    });
};
let email_data = {
    from: 'csw2757@naver.com',
    to: "csw2757@naver.com",
    subject: 'test',
    text: 'nodejs'
}
send(email_data);
// 이메일 보내기