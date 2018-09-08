
import {Service} from './service';
import {Services} from './services';
import {Md5} from 'ts-md5/dist/md5';

export class HashService {
private md5 : Md5;

    constructor(
       // public services:Services 
    ){

        this.md5 = new Md5();
        this.hashString = this.hashString.bind(this);
    }

    public start() : Promise<any>{
        return Promise.resolve();
    }

    public whenReady() : Promise<any>{
        return Promise.resolve();
    }

    public hashString(str: string)  {
    
        let hash = this.md5.appendStr(str).end();

        return hash;
    }

}
