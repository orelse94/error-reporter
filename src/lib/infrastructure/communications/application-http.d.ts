import {Request , Response , Application } from 'express';
import {ApplicationContext} from './application-context';

export type nextRequest = (error?: Error) => void;

export interface ApplicationHttpRequest extends Request{
    applicationContext : ApplicationContext;
    app : Application,
}
export interface ApplicationHttpResponse extends Response{
    
}
