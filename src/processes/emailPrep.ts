import { MyAppRequest, MyAppResponse } from "../lib/application/my-app/my-app.http";
import { Services } from "../lib/concreate/services";
import { sendAnEmail } from "./emailing";
import { MysqlService } from "../lib/concreate/services/mySql";

  export interface reqStracture {
    table: string,
    fields: string[],
    data: string[]
  }

  export const callAlertMsging = () => {
      

    const mysql= new MysqlService(); 

    // req.applicationContext.log('info' , {
    //   'Message' : `[MYSQL API] - Alerts Service Querying for Errors`
    // });
    // this should be fixed - 
    // services.mysql.checkForAlerts()
    return mysql.checkForAlerts()
    .then((response: {status: number, message}) => {
        
        let msgTop = "<h2 >Errors Reported:</h2><table><thead><tr><td><strong>time_stamp</strong></td><td><strong>alert</strong></td><td><strong>processed</strong></td></tr></thead><tbody><tr>"
        let msgBottom = "</tbody></table><p><strong>&nbsp;</strong></p><p><strong>This email was provided by alerts-service </strong><br /><strong>Enjoy!</strong></p>"

        // let msgTop = "<h2 style="'font-family:'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'; color: '#2e6c80';">Errors Reported:</h2><table style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"><thead><tr><td><strong>time_stamp</strong></td><td><strong>alert</strong></td><td><strong>processed</strong></td></tr></thead><tbody><tr>"
        // let msgBottom = "</tbody></table><p><strong>&nbsp;</strong></p><p style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: #2e6c80;"><strong>This email was provided by alerts-service </strong><br /><strong>Enjoy!</strong></p>"
        if (response.status == 200) {

            let msgContent = msgTop;
            let trS = "<tr></br>"
            let trE = "</tr>"
            let tdS = "<td></br>"
            let tdE = " |  </td>"
    
            let msgWrapperAfter = "" 
            response.message.map(singleErr => {
                msgContent += trS;
    
                let props = Object.keys(singleErr);
                props.map(prop => {
                    if (['time_stamp','alert','processed'].includes(prop)) {
                    msgContent += tdS;                
                    msgContent += singleErr[prop] 
                    msgContent += tdE;  
                }      
    
                })
                msgContent += trE;
            })
            msgContent += msgBottom;
    

            return sendAnEmail({res: response.message, html: msgContent})

        } else if (response.status == 500) {
            return sendAnEmail({res: response.message, html: '<p style= "font-family:"Franklin Gothic Medium"; "color": purple;>sent from orel</p>'})
        } else {

            return 'didnt send any mail'
            
    // req.applicationContext.log('error' , {
    //     'Error' : `[MYSQL API] - ${req.url} - Error data : error retriveing sql data`
    //   });
  
            
        }
    })
    .catch(err => {
        console.log({msg: 'sent from emailPrep.ts',err});
        
        // req.applicationContext.log('error', {
        //     'Error ' : `[MYSQL API ERROR] - ${err}` 
        // })
    })       
 
  }





