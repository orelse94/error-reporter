import {Services} from '../../concreate/services';
import {Config} from '../../infrastructure/external-interfaces/config';
import * as express from 'express';
import {Server} from 'http';
import {Logger} from '../../infrastructure/external-interfaces/logger';
import {MyAppConnections} from './connections';
import {MyAppApplicationContext} from './my-app.context';
import {MyAppRequest , MyAppResponse } from  './my-app.http';
import {nextRequest} from '../../infrastructure/communications/application-http';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();


export class MyAppApplication{
    static get http(){return require('http')};
    static get routers() {return require('./routers')};

    private services:Services;
    private expressApp:express.Application;
    public server:Server;
    constructor(
        public config : Config ,
        public logger : Logger,
        public connections : MyAppConnections
    ){
        const expressApp = this.expressApp = express();

        const router = MyAppApplication.routers.router;
       
        expressApp.set('config' , config);
        expressApp.set('logger' , logger);
        expressApp.set('connections' , connections);
        expressApp.use(bodyParser.json({ limit: '100kb' }));



        expressApp.use((req : MyAppRequest , res: MyAppResponse, next : nextRequest)=>{
            req.applicationContext = new MyAppApplicationContext(req , res , logger);
            next();
        });
        expressApp.use(router);

        this.server = MyAppApplication.http.createServer(expressApp);
    }
    public setServices(services : Services) : void{
        this.services = services;

        this.expressApp.set('services' , services);
    }

    
    public listen(port:number):Promise<number>{
        return new Promise((resolve,reject)=>{
            
            this.server.listen(port , (error : Error , port : number)=>{
                if (error)
                    reject(error);
                else resolve(port)
            })
        })
    }
}