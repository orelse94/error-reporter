export interface Config{
    on?(name : string , cb :Function):any;
    get(name : string , type?:any):any;
    get<T>(name : string, type?:any):T;
    set(name : string, value :any):void;
    set<T>(name : string , value : T):void;
}