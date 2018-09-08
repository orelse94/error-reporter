
export class Order{
    constructor(
        public userId : string,
        public amount : number,
        public unitPrice : number
    ){

    }
    get price(){
        return this.amount * this.unitPrice;
    }
}
