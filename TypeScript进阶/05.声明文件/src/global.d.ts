
/**
 * 全局声明
 */
interface Console {
    log(message?:any):void
    error(message?:any):void
}
declare var console:Console

// declare namespace console {
//     function log(message?:any):void
//     function error(message?:any):void
// }

type timeHandle = () => void
declare function setTimeout(handler:timeHandle,miliseconds:number):number

declare function setInterval(handle:timeHandle,miliseconds:number):number

// 三斜线指令 用来引入其他声明文件
/// <reference path="../../index.d.ts"/>

