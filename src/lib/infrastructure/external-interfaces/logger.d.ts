export interface Logger{
    logJson(
        level : string  ,
        json : LogData
    ):any;
}
export interface LogData{
    [key:string]:LogData | string | number | boolean| string[] | number[] | boolean[]
}