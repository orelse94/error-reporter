import {Logger} from '../external-interfaces/logger';

export class ConnectionTimer{
    constructor(
        private logger : Logger
    ){

    }
    public push(message:TimerMessage):void{
        this.logger.logJson('info',{
            'Message' : message.toMessage()
        })
    }
    public getTimer():RequestTimer{
        return new RequestTimer(this)
    }
}
// export interface TimerMessage{
//     toMessage():string;
//     setDuration(duration:number):void;
// }
export class TimerMessage{
    protected duration:number;
    constructor(
        public serviceName : string,
        public path : string
    ){

    }
    public setDuration(duration : number):void{
        this.duration = duration;
    }
    public toMessage():string{
        return `${this.serviceName}.timer.${this.path}.${this.duration}`;
    }
}

export class RequestTimer{
    public startTime : number = Date.now();
    constructor(
        private connectionTimer:ConnectionTimer
    ){

    }
    public get duration(){
        return Date.now() - this.startTime;
    }
    public endWith(message : TimerMessage):void{
        message.setDuration(this.duration);
        this.connectionTimer.push(message)
    }
}