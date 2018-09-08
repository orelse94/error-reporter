export interface ChainResBody {
    score: string,
    name: string,
    category: string,
}

export interface CbObjectApi {
    status: number,
    message: string,
    body?: ChainResBody,
    error: string
}

export class CbApi {
    [x: string]: any;
    private cbObj: CbObjectApi;

    constructor(status: number, message: string, error: string, body?: ChainResBody) {
        this.cbObj = {
            status,
            message,
            body,
            error
        }
    }

    setandCbApi(status: number, message: string, error: string, body: ChainResBody, cb: (res: any) => any) {
        this.cbObj = {
            status,
            message,
            body,
            error
        }        
        
        cb(this.cbObj);
    }

    onErrorCbApi(error: string,cb: (res: any) => any) {
        this.cbObj = {
            status: 500,
            message: '[INTERNAL ERROR] - api call could not execute',
            error
        }
    }
}