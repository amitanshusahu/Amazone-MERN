"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("config");
class Fetch {
    constructor(payload, url) {
        this.payload = payload;
        this.url = url;
    }
    postJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.payload)
            });
            const jsonRes = yield res.json();
            return jsonRes;
        });
    }
    postAuthjson() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, config_1.loadSecrets)();
            const res = yield fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${config_1.TOKEN}`
                },
                body: JSON.stringify(this.payload)
            });
            const jsonRes = yield res.json();
            return jsonRes;
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, config_1.loadSecrets)();
            const res = yield fetch(this.url, {
                method: 'GET',
                headers: {
                    'Authorization': `${config_1.TOKEN}`
                },
            });
            const jsonRes = yield res.json();
            return jsonRes;
        });
    }
}
exports.default = Fetch;
