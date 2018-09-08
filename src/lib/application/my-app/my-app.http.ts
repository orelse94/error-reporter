import {ApplicationHttpRequest , ApplicationHttpResponse , nextRequest } from '../../infrastructure/communications/application-http';

export type nextRequest = nextRequest;

export interface MyAppRequest extends ApplicationHttpRequest{

}
export interface MyAppResponse extends ApplicationHttpResponse{

}