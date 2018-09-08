const token = '2ab9ebf3eeb1186e502c9ed85b9fda0777efd171392b436c1bf80d8fdd12af2d'

export interface Options {
    headers: Headers,
    json: boolean,
    body?: object
}

export interface Headers {
    'User-Agent': string,
    Token: string
}


export class ApiOptions {
    options: Options;

    // if there is data then add it
    constructor(body?: object) {
        let options: Options;
        if (body) {
            options = { 
                headers: {
                'User-Agent': 'request',
                Token: token
            }, 
            json: true, 
            body
            } 

        } else {
            options = { 
                headers: {
                'User-Agent': 'request',
                Token: token

            }, 
            json: true, 
            }
        }

        this.options = options;

    }

    setData(body: object, cb: (options: Options) => any) {
        this.options = { 
            headers: {
            'User-Agent': 'request',
            Token: token
        }, 
        json: true, 
        body
        };

        cb(this.options);
        
    }

    getOptions(cb: (options: Options) => any) {
        cb(this.options);
    }
}

