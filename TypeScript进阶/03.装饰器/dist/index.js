"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class MyMath {
    sum(a, b) {
        return a + b;
    }
}
__decorate([
    __param(1, test),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MyMath.prototype, "sum", null);
function test(target, method, index) {
    console.log(target);
    console.log(method);
    console.log(index);
}
class User {
}
__decorate([
    Reflect.metadata('a', '账号'),
    __metadata("design:type", String)
], User.prototype, "loginId", void 0);
__decorate([
    Reflect.metadata('b', '年龄'),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
