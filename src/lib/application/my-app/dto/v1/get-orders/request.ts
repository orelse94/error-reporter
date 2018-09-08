import {RequestDto} from "../../request-dto";
import {ApplicationHttpRequest} from "../../../../../infrastructure/communications/application-http";

export class GetOrdersRequestV1 implements RequestDto{
  public errors:Error[];
  constructor(private request:ApplicationHttpRequest){
    this.errors = [];
  }

  async validate(){
    //if (request.headers['Auth'] == 'something') return false;
    return true;
  }
}
