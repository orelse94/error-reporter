import {ApplicationLogMessage} from './application-log-message';
import {ApplicationHttpRequest , ApplicationHttpResponse} from './application-http'

export interface ApplicationContext{
    req:ApplicationHttpRequest;
    res:ApplicationHttpResponse;
    id: string;
    log(level : string , data : ApplicationLogMessage):void;
}
 