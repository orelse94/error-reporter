
import {Service} from './service';
import {Services} from './services';
import { callAlertMsging } from '../../../processes/emailPrep';
import { resolve } from 'path';
import { MyAppRequest } from '../../application/my-app/my-app.http';
import { MyAppApplication } from '../../application/my-app';

export class AlertErrorsService implements Service{
    private trigger;

    constructor(
        public services:Services,
        

    ){
        this.startWatchingAlerts = this.startWatchingAlerts.bind(this);
        this.startWatchingAlerts();
    }

    public start() : Promise<any>{
        return Promise.resolve();
    }
    public whenReady() : Promise<any>{
        return Promise.resolve();
    }
    
    private startWatchingAlerts() {
        setTimeout(() => {
        return new Promise((resolve, reject) => {
            console.log(new Date(), 'looking for mail to send')
            // after it ends ^^
            resolve(callAlertMsging())
        })
        .then(() => {
            return this.startWatchingAlerts()
        })
        .catch(err => {
            console.log(err);
        })
    }, Number(process.env.ERROR_CHECKUP_INTERVALS));
}
}
