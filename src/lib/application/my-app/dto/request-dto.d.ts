export interface RequestDto{
  validate(request:any):Promise<boolean>
}
