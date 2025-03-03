"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_file = void 0;
const path = __importStar(require("path"));
const osu_file_type_1 = require("../consts/osu_file_type");
const raw_file_1 = require("./raw_file");
class osu_file extends raw_file_1.raw_file {
    constructor(file_path, property_settings) {
        super(file_path);
        this.file_type = osu_file_type_1.osu_file_type.none;
        if (typeof property_settings === 'undefined') {
            this.property_settings = [];
        }
        else {
            this.property_settings = property_settings;
        }
    }
    // depricated
    get_type() {
        return this.file_type;
    }
    // depricated
    set_type() {
        if (path.extname(this.file_basename) === '.db') {
            if (this.file_basename.startsWith(osu_file_type_1.osu_file_type.osu_db)) {
                this.file_type = osu_file_type_1.osu_file_type.osu_db;
            }
            else {
                switch (this.file_basename) {
                    case osu_file_type_1.osu_file_type.collection_db:
                        this.file_type = osu_file_type_1.osu_file_type.collection_db;
                        break;
                    case osu_file_type_1.osu_file_type.scores_db:
                        this.file_type = osu_file_type_1.osu_file_type.scores_db;
                        break;
                }
            }
            if (this.file_type === osu_file_type_1.osu_file_type.none) {
                return false;
            }
            return true;
        }
        else {
            if (path.extname(this.file_basename) === '.osr') {
                this.file_type = osu_file_type_1.osu_file_type.replay_osr;
                return true;
            }
        }
        return false;
    }
    set_property_settings(property_settings) {
        if (property_settings && property_settings.length > 0) {
            this.property_settings = property_settings;
        }
        else {
            throw new Error('wrong parse settings');
        }
    }
}
exports.osu_file = osu_file;
