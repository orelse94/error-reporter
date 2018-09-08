import { MyAppInitializer} from '../lib/application/my-app/my-app.init';
import { MyAppConnections} from '../lib/application/my-app/connections';
import {Logger} from '../lib/infrastructure/external-interfaces/logger';
import {Config} from '../lib/infrastructure/external-interfaces/config';



class ProcessConfig implements Config{
    
    private data : {[key:string]:any} = {
        "MY_APP_PROCESS_PORT" : 3001,
    }
    whenReady(){
        return Promise.resolve();
    }
    get<T>(key : string):T{
        return this.data[key];
    }
    set<T>(key:string , value : T):void{
        this.data[key] = value;
    }
}

const config = new ProcessConfig();

const logger = {
    logJson(level , data){
        console[level](data);
    }
};
config.whenReady()
    .then(() =>{
        console.log(config);
        
        const appInitializer = new MyAppInitializer(config , logger);
        return appInitializer.bootstrap();
    })
    .then(() =>{
        logger.logJson('info',{
            Message : 'app is loaded' ,
            
        });
    })
    .catch((err : Error) =>{
        logger.logJson('error',{
            Message : 'app critical exception'
        });
        console.log(err.message , err.stack);
        process.exit(3);
    });
