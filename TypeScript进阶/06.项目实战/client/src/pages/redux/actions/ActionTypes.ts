// action 类型

// T 必须是字符串
export interface IAction<T extends string,P>{
  type:T
  payload:P
}