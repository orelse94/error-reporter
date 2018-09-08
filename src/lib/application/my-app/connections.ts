import {ApplicationConnections} from '../../infrastructure/communications/application-connections';
import {Logger} from '../../infrastructure/external-interfaces/logger';
import {Config} from '../../infrastructure/external-interfaces/config';
import {ConnectionTimer, RequestTimer} from '../../infrastructure/communications/connection-timer';

export class MyAppConnections implements ApplicationConnections{
    public connectionTimer:ConnectionTimer;
    constructor(
        public config : Config,
        public logger : Logger
    ){
        this.connectionTimer = new ConnectionTimer(logger);
    }

    public getTimer():RequestTimer{
        return this.connectionTimer.getTimer();
    }
}