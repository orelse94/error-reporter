import {Order} from "../../../../../domain/trading/order";
import {OrdersResponse} from "../../../../../concreate/services/orders";

export class GetOrdersResponseV1{
  public clientResponse:OrdersClientResponse;
  public statusCode : number = 500;
  constructor(
    ordersResponse : OrdersResponse
  ){
    this.clientResponse = this.generateClientResponse(ordersResponse );
    if (ordersResponse.fromCache){
      this.statusCode = 208; //Just because it's an example...
    }
    else if (ordersResponse.orders.length){
      this.statusCode = 204;
    }
    else this.statusCode = 200;
  }
  generateClientResponse(ordersResponse : OrdersResponse): OrdersClientResponse{
    return new OrdersClientResponse(ordersResponse);
  }
}

class OrdersClientResponse{
  public orders : {price:number , amount : number}[];
  constructor(
    ordersResponse : OrdersResponse
  ){
    this.orders = ordersResponse.orders.map(order => ({
      amount : order.amount,
      price : order.price
    }))
  }
}
