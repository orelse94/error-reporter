
import {Service} from './service';
import {Services} from './services';

export class Hello implements Service{

    constructor(
        public services:Services 
    ){

    }

    public start() : Promise<any>{
        return Promise.resolve();
    }
    public whenReady() : Promise<any>{
        return Promise.resolve();
    }
    
    public async example() : Promise<string>{
        return "Hi!";
    }
    
}
