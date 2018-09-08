
export interface Service{
    start():Promise<any>;
    whenReady?():Promise<any>;
}