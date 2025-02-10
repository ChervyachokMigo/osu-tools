"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close_realm = exports.get_realm_objects = exports.open_realm = void 0;
const realm_1 = __importDefault(require("realm"));
const open_realm = (file_path) => {
    const realm = new realm_1.default({
        path: file_path,
        readOnly: true,
    });
    return realm;
};
exports.open_realm = open_realm;
const get_realm_objects = (realm, type) => {
    return realm.objects(type);
};
exports.get_realm_objects = get_realm_objects;
const close_realm = () => {
    realm_1.default.shutdown();
};
exports.close_realm = close_realm;
