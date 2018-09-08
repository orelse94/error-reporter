import * as mysql from 'mysql';
import { resolve } from 'url';
import { rejects } from 'assert';


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
    private query: string = '';
    private allTablesInDb: string[];
    private results: object[];
    private alertsQuery: string;
    

    constructor(){
        this.table = process.env.ERRORS_TABLE;
        this.alertsQuery = `SELECT * FROM ${this.table} WHERE processed = 0`

        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.getAllTables()
        .then(allTables => this.allTablesInDb = allTables);        
    } 

    closeConnection() {

        this.connection.end();
        console.log('[CONNECTION CLOSED] -');
        
    }

    getAllTables() {
        
        return new Promise(( resolve, reject ) => {

            this.connection.query('show tables', (err, rows, fields) =>{
                if (err) {
                    reject({status:500, message: err});
                }

                resolve({status: 200, message: rows})
                })
            })
            .then((rowsObj : {status, message})  => {
                if (rowsObj.status == 500) {
                    return false;
                }

                return rowsObj.message;
            })
            .then((rowPacket) => {
                if (rowPacket) {
                    let prop = Object.keys(rowPacket[0])[0];
                    let allTables = 
                    rowPacket.map(singleRow => {
                        return singleRow[prop];
                    })
                    return allTables;
                }
            })
        
    }

    updateRows() {
        let removeQuery = `UPDATE ${this.table} SET processed = 1`;
        return new Promise((resolve, reject) => {


            this.connection.query(removeQuery, (err) => {
                if (err) {
                    reject()
                } else {
                    resolve()
                }
            })
        })

    }
    
    setData(table: string, fields: string[], data: string[]){
        this.table = table;
        this.fields = fields;
        this.data = data;

        this.generateQuery();
    }

    generateQuery() {
        let randomId =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let timeStamp = new Date().toUTCString();
        let fieldsStr = '( id, date, ';
        let valuesStr = `( "${randomId}", "${timeStamp}", `;

        this.fields.map((field, i) => {
            fieldsStr += field;
            valuesStr += `"${this.data[i]}"`;

            i != this.fields.length -1 ? 
            (fieldsStr += ',', valuesStr += ',') : 
            (fieldsStr += ')', valuesStr += ')');

        });

        this.query = `INSERT INTO ${this.table} ${fieldsStr} VALUES ${valuesStr};`;
    }

    createTableQuery()  {
        return new Promise((resolve, reject) => {
        // check wheater a table exists or not 
        if (this.allTablesInDb.indexOf(this.table) != -1) {
            resolve({status: 200, message: `table ${this.table} exists in the db`})
        }
        
        let createQuery = `CREATE TABLE ${this.table} ( id VARCHAR(255), date VARCHAR(255), `;
        this.fields.map((field, i) => {
            createQuery += `${field} VARCHAR(255)`
            // add comma if it is not the last field
            i < this.fields.length - 1 ? createQuery += ',' : undefined; 
        })
        createQuery += ')';
        console.log({createQuery});
        
        this.connection.query(createQuery, (err: any, rows: any, fields: any) => {
            if (err) {
                reject({status:500, message: err});
            }
            
            this.getAllTables()
            .then(allTables => {
                this.allTablesInDb = allTables;

                resolve({status: 200, message: `successfully created table ${this.table}`});
            })
        });
        }) 
    }

    queryExecuter() {
        // verify the table exists 
        return this.createTableQuery()
        .then((response : {status, messge}) => {
            if (response.status == 200 ) {
                return new Promise((resolve, reject) => {
                    console.log({query: this.query});
                    
                    this.connection.query(this.query, (err: any, rows: any, fields: any) => {
                        if (err) {
                            reject({status:500, message: err});
                        }
            
                        resolve({status: 200, message: `successfully inserted 1 row to table ${this.table}`});
                    });
                }) 
            }
        })
    }

    setAndInsert(table: string, fields: string[], data: string[]){
        this.setData(table, fields, data);

        return this.queryExecuter();
        
    }

    retAlerts() {

        return new Promise((resolve, reject) => {
            
            console.log({query: this.alertsQuery});
            
            this.connection.query(this.alertsQuery, (err: any, rows: any, fields: any) => {
                if (err) {
                    
                    resolve({status:500, message: err});
                }

                if (!rows ) {
                    this.updateRows()
                    console.log('ERROR 201', err, rows, fields);

                    resolve({status: 201, message: 'no results'})
                } 

                else {

                    this.results = JSON.parse(JSON.stringify(rows));
                    this.updateRows()
                    resolve({status: 200, message: this.results});
                }

            });
        }) 
    }

}