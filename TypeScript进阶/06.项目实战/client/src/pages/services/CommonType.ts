export interface IResponseError {
  err: string;
  data: null;
}

export interface IResponseData<T> {
  err:''
  data:T
}

export interface IResponsePageData<T> {
  err:''
  data:T[],
  total:number
}

export interface ISearchConditions {
  page?:number
  limit?:number
  key?:string
}

// switch 改变的枚举
export enum SwitchType {
  isHot = 'isHot',
  isComing = 'isComing',
  isClasic = 'isClasic'
}