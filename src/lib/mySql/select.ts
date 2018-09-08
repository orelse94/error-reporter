import * as mysql from 'mysql';


/**
 * inserts data to the db
 * 
 * would be created once and would be used
 */

export class InsertToDb {
    private host: string = process.env.MYSQL_HOST;
    private user: string = process.env.MYSQL_USER;
    private password: string = process.env.MYSQL_PASSWORD;
    private database: string = process.env.MYSQL_DB;
    private table: string;
    private fields: string[];
    private data: string[];
    private connection: any;
    private query: string;
    private allTablesInDb: string[];
    private results: object[];
// grab 0
// send an email 
// change rows to processed 1

    constructor(table: string = '', fields: string[] = [], data: string[] = []){
        this.table = table;
        this.fields = fields;
        this.data = data;
        this.query = 'SELECT * FROM Alerts WHERE processed = 0'

        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

    } 

    closeConnection() {

        this.connection.end();
        console.log('[CONNECTION CLOSED] -');
        
    }

    handleResults(resRows) {
        // resRows.map
    }


    queryExecuter() {
        return new Promise((resolve, reject) => {
            console.log({query: this.query});
            
            this.connection.query(this.query, (err: any, rows: any, fields: any) => {
                if (err) {
                    reject({status:500, message: err});
                }
                this.results = JSON.parse(rows);
                console.log({rows: this.results});
                

                // resolve({status: 200, message: `successfully inserted 1 row to table ${this.table}`});
            });
        }) 
    }
}