import {ApplicationContext} from '../../infrastructure/communications/application-context';
import {ApplicationHttpRequest, ApplicationHttpResponse} from '../../infrastructure/communications/application-http';
import {LogData, Logger} from '../../infrastructure/external-interfaces/logger';
import {ApplicationLogMessage} from '../../infrastructure/communications/application-log-message';
const uuid = require('uuid');
const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export class MyAppApplicationContext implements ApplicationContext{
    public id : string;
    public correlationId : string;
    constructor(
        public req : ApplicationHttpRequest,
        public res : ApplicationHttpResponse,
        public logger : Logger
    ){
        this.id = uuid.v4();
        if (req.query && GUID_REGEX.test(req.query.correlationId)){
            this.correlationId = req.query.correlationId
        }
        else {
            this.correlationId = this.id;
        }
    }
    public log(level : string , data: ApplicationLogMessage):void{
        data['CorrelationId'] = this.correlationId;
        data['InternalId'] = this.id;
        
        this.logger.logJson(level , data);
    }
}