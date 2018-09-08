import {Router} from 'express';
import {MyAppRequest , MyAppResponse , nextRequest} from  '../my-app.http';
import { Services } from '../../../concreate/services';
import {GetOrdersRequestV1} from "../dto/v1/get-orders/request";
import {Order} from "../../../domain/trading/order";
import {GetOrdersResponseV1} from "../dto/v1/get-orders/response";
import {OrdersResponse} from "../../../concreate/services/orders";

export const chainApis = Router();

chainApis.post('/orders' , (
    req :  MyAppRequest ,
    res :  MyAppResponse,
    next : nextRequest
  )=>{

    const services = <Services>req.app.get('services');
    req.applicationContext.log('info' , {
      'Message' : 'user started getting orders'
    });

    const getOrdersRequest = new GetOrdersRequestV1(req);
    getOrdersRequest.validate()
    .then(()=>{
      services.orders.getOrders('testUserId')
        .then((ordersResponse : OrdersResponse)=>{
          req.applicationContext.log('info' , {
            'Message' : 'user saw orders'
          });
          const responseDto = new GetOrdersResponseV1(ordersResponse);

          res.status(responseDto.statusCode);
          res.send(responseDto.clientResponse)
        })
    })

  });
