"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSecrets = exports.TOKEN = exports.getproducturl = exports.getproductsurl = exports.createproducturl = exports.meurl = exports.loginurl = exports.signupurl = void 0;
const BASE_URI = `http://localhost:9000/api`;
exports.signupurl = `${BASE_URI}/auth/signup`;
exports.loginurl = `${BASE_URI}/auth/login`;
exports.meurl = `${BASE_URI}/auth/me`;
exports.createproducturl = `${BASE_URI}/app/createproduct`;
exports.getproductsurl = `${BASE_URI}/app/getproducts`;
exports.getproducturl = `${BASE_URI}/app/getproduct/`;
function loadSecrets() {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
        return null;
    }
    exports.TOKEN = token;
}
exports.loadSecrets = loadSecrets;
