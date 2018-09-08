import {Router} from 'express';
import {MyAppRequest , MyAppResponse , nextRequest} from  '../my-app.http';
import { Services } from '../../../concreate/services';
import { retAlerts } from '../../../../processes/mySqlAlerts';


export const mysqlRouter = Router();

mysqlRouter.post('/db/insert' , (
    req :  MyAppRequest ,
    res :  MyAppResponse,
    next : nextRequest
  )=>{
    const keys = Object.keys(req.body);
    let containsData: boolean= true;

    ! keys.includes('table') ? containsData = false : 
    ! keys.includes('fields') ? containsData = false : 
    ! keys.includes('data') ? containsData = false : undefined;

    if (! containsData){
      res.status(400)
      res.send('bad request error')

    } else {
      return callMysql(req, res, req.body)
    }
     
  });

  export interface reqStracture {
    table: string,
    fields: string[],
    data: string[]
  }

  const callMysql = (req : MyAppRequest, res: MyAppResponse, dbreq: reqStracture) => {

    const services = <Services>req.app.get('services');

    req.applicationContext.log('info' , {
      'Message' : `[MYSQL API] - ${req.url} - request to insert data : ${JSON.stringify(dbreq)}`
    });

    services.mysql.insertToDb(dbreq.table, dbreq.fields, dbreq.data)
    .then((response: {status: number, message: string}) => {

      res.status(response.status)
      res.send(response.message)

    })       
 
  }

mysqlRouter.get('/db/errors' , (
    req :  MyAppRequest ,
    res :  MyAppResponse,
    next : nextRequest
  )=>{
    return retAlerts(req, res, req.body)
});
