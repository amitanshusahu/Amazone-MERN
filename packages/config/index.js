"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSecrets = exports.USERNAME = exports.TOKEN = exports.updateproducturl = exports.issellerurl = exports.buyfromcartturl = exports.getcarturl = exports.addtocarturl = exports.getbuyerorderurl = exports.getsellerorderurl = exports.buyproducturl = exports.getproducturl = exports.getproductsurl = exports.createproducturl = exports.meurl = exports.loginurl = exports.signupurl = exports.BASE_URI = void 0;
exports.BASE_URI = `http://localhost:9000/api`;
exports.signupurl = `${exports.BASE_URI}/auth/signup`;
exports.loginurl = `${exports.BASE_URI}/auth/login`;
exports.meurl = `${exports.BASE_URI}/auth/me`;
exports.createproducturl = `${exports.BASE_URI}/app/createproduct`;
exports.getproductsurl = `${exports.BASE_URI}/app/getproducts`;
exports.getproducturl = `${exports.BASE_URI}/app/getproduct/`;
exports.buyproducturl = `${exports.BASE_URI}/app/buyproduct`;
exports.getsellerorderurl = `${exports.BASE_URI}/app/seller/getorder`;
exports.getbuyerorderurl = `${exports.BASE_URI}/app/buyer/getorder`;
exports.addtocarturl = `${exports.BASE_URI}/app/addtocart`;
exports.getcarturl = `${exports.BASE_URI}/app/getcart`;
exports.buyfromcartturl = `${exports.BASE_URI}/app/buyfromcart`;
exports.issellerurl = `${exports.BASE_URI}/auth/isseller`;
exports.updateproducturl = `${exports.BASE_URI}/app/updateproduct`;
function loadSecrets() {
    const token = localStorage.getItem('TOKEN');
    const username = localStorage.getItem('USERNAME');
    if (!token || !username) {
        return null;
    }
    exports.TOKEN = token;
    exports.USERNAME = username;
    console.log('Exposing Secrets:', exports.TOKEN, exports.USERNAME);
}
exports.loadSecrets = loadSecrets;
