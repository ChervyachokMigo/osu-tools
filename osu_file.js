"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_file = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Buffer_parse_1 = require("./Buffer_parse");
const osu_file_type_1 = require("./osu_file_type");
class osu_file {
    constructor(file_path, parse_settings) {
        this.file_type = osu_file_type_1.osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path_1.default.basename(file_path);
        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }
        if (typeof parse_settings === 'undefined') {
            this.parse_settings = [];
        }
        else {
            this.parse_settings = parse_settings;
        }
        try {
            this.file_handle = fs_1.default.openSync(`${file_path}`, 'r');
            this.buff = new Buffer_parse_1.Buffer_parse(this.file_handle);
        }
        catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
    }
    close() {
        return fs_1.default.closeSync(this.file_handle);
    }
    get_type() {
        return this.file_type;
    }
    set_type() {
        if (path_1.default.extname(this.file_basename) === '.db') {
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
            return false;
        }
    }
    set_parse_settings(parse_settings) {
        if (parse_settings && parse_settings.length > 0) {
            this.parse_settings = parse_settings;
        }
        else {
            throw new Error('wrong parse settings');
        }
    }
}
exports.osu_file = osu_file;
