
import {Config} from '../../infrastructure/external-interfaces/config';
import {Logger} from '../../infrastructure/external-interfaces/logger';
import {ApplicationConnections} from '../../infrastructure/communications/application-connections';
import {Hello} from './hello';
import {MysqlService} from './mySql'
import { HashService } from './hashing';
import { AlertErrorsService } from './alertingErrors';

export class Services{
    [x: string]: any;

    public hello : Hello;
    public mysql : MysqlService;
    public hashing : HashService;
    public alertErrors : AlertErrorsService;
    
    constructor(
        public config:Config ,
        public logger:Logger,
        public connections:ApplicationConnections
    ){

    }
    private createService(key : string, serviceClass) : Promise<any>{
        const service = new serviceClass(this);
        const promise = service.start();
        this[key] = service;
        return promise;
    }
    private checkAndCreateService(services , serviceName , ServiceClass):Promise<any>{
        
        if (services.indexOf(serviceName) != -1 && !this[serviceName]){
            return this.createService(serviceName , ServiceClass);
        }
    }
    public startServices(services : string[]):Promise<any[]>{
        const pairs = [
            ['hello' , Hello],
            ['mysql', MysqlService],
            ['hashing', HashService],
            ['alertErrors', AlertErrorsService]
        ];
        return Promise.all(pairs.map(pair=>
            this.checkAndCreateService(services , pair[0] , pair[1])
        ));
    }
}
