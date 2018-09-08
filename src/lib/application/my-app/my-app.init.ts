
import {Services} from '../../concreate/services';
import {Config} from '../../infrastructure/external-interfaces/config';
import {Logger} from '../../infrastructure/external-interfaces/logger';
import { MyAppConnections} from './connections';
import { MyAppApplication} from './my-app';



export class MyAppInitializer {
    public  myAppApplication:MyAppApplication;
    private services : Services;
    private connections : MyAppConnections;

    constructor(
        private config : Config,
        private logger : Logger
    ){

    }
    public bootstrap():Promise<any>{
        this.myAppApplication = new MyAppApplication(
                this.config ,
                this.logger ,
                this.connections
            );
        return Promise.all([
            this.myAppApplication.listen(this.config.get('MY_APP_PROCESS_PORT'))
        ])
            .then(()=>{
                const services = this.services = new Services(this.config , this.logger ,  this.connections);
                return services.startServices([
                    'scoreChain',
                    'hashing',
                    'mysql', 
                    'alertErrors'
                ]);
            })
            .then(()=>{
                return this.myAppApplication.setServices(this.services)
            });
    }
}

// ################