
import {Service} from './service';
import {Services} from './services';
import { InsertToDb } from '../../mySql/InsertToDb';

export class MysqlService implements Service{
    private mySqlClass: InsertToDb;

    constructor(
        public services ?:Services,
        

    ){
        this.mySqlClass = new InsertToDb();
    }

    public start() : Promise<any>{
        return Promise.resolve();
    }
    public whenReady() : Promise<any>{
        return Promise.resolve();
    }
    
    public insertToDb(table: string, fields: string[], data: string[]) {

        return this.mySqlClass.setAndInsert(table, fields, data);

    }

    public checkForAlerts() {
        return this.mySqlClass.retAlerts();
    }
    
}
