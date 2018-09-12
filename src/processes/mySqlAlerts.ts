import { MyAppRequest, MyAppResponse } from "../lib/application/my-app/my-app.http";
import { Services } from "../lib/concreate/services";
import { sendAnEmail } from "./emailing";

  export interface reqStracture {
    table: string,
    fields: string[],
    data: string[]
  }

  export const retAlerts = (req : MyAppRequest, res: MyAppResponse, dbreq: reqStracture) => {

    const services = <Services>req.app.get('services');

    req.applicationContext.log('info' , {
      'Message' : `[MYSQL API] - ${req.url} - request data : ${JSON.stringify(dbreq)}`
    });
    services.mysql.checkForAlerts()
    // (dbreq.table, dbreq.fields, dbreq.data)

    // services.mysql.insertToDb(dbreq.table, dbreq.fields, dbreq.data)
    .then((response: {status: number, message}) => {
        
        let msgTop = "<h2 >Errors Reported:</h2><table><thead><tr><td><strong>time_stamp</strong></td><td><strong>alert</strong></td><td><strong>processed</strong></td></tr></thead><tbody><tr>"
        let msgBottom = "</tbody></table><p><strong>&nbsp;</strong></p><p><strong>This email was provided by alerts-service </strong><br /><strong>Enjoy!</strong></p>"

        // let msgTop = "<h2 style="'font-family:'Franklin Gothic Medium', 'Arial Narrow', 'Arial', 'sans-serif'; color: '#2e6c80';">Errors Reported:</h2><table style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"><thead><tr><td><strong>time_stamp</strong></td><td><strong>alert</strong></td><td><strong>processed</strong></td></tr></thead><tbody><tr>"
        // let msgBottom = "</tbody></table><p><strong>&nbsp;</strong></p><p style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: #2e6c80;"><strong>This email was provided by alerts-service </strong><br /><strong>Enjoy!</strong></p>"
        if (response.status == 200) {
            if (response.message) {
                console.log({res: response.message});
                
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
        
    
                sendAnEmail({res: response.message, html: msgContent})
    
            }

        } else if (response.status == 500) {
            sendAnEmail({res: response.message, html: '<p style= "font-family:"Franklin Gothic Medium"; "color": "#2e6c80";>sent from orel</p>'})
        } else {
            
    req.applicationContext.log('error' , {
        'Error' : `[MYSQL API] - ${req.url} - Error data : error retriveing sql data`
      });
  
            
        }
     
     
     

      res.status(response.status)
      res.send(response.message)


    })       
 
  }





