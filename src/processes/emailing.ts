const sgMail = require('@sendgrid/mail');
import * as dotenv from 'dotenv';
dotenv.config();


export const sendAnEmail = (msgObj) => {
    
    // let mailHead = '<p style="color: navy;"> Hi :) it is an email from my service.. let me know what you think</p> <span style="color: navy;"><storng> btw, it is sent automatically, after querying the db</strong></span>';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        "personalizations": [
            {
              "to": users,
            }
          ],
    //   to: 'orel@etorox.com',
      from: process.env.MAILING_FROM,
      subject: 'test mail ⛔✌',
    //   subject: `Error Notified -⛔ ${msgObj.res[0].alert}`,
      html: 
       msgObj.html 
      + '<p>Orel</p>'
    };

    
    return sgMail.send(msg)
}

const setConsumers = () => {
    let sendToArr: string[] = process.env.MAILING_LIST.split(' ');
    return sendToArr;
}

const setToProps = (usersArr : string[]) => {
    return usersArr.map(user => {
        return { email: user } 
    });
}

const users = setToProps(setConsumers());

