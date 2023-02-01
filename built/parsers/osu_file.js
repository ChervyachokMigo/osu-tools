"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_file = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Buffer_parse_1 = require("../tools/Buffer_parse");
const osu_file_type_1 = require("../consts/osu_file_type");
const mmap_io_1 = __importDefault(require("@raygun-nickj/mmap-io"));
class osu_file {
    constructor(file_path, property_settings) {
        this.file_type = osu_file_type_1.osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path_1.default.basename(file_path);
        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }
        if (typeof property_settings === 'undefined') {
            this.property_settings = [];
        }
        else {
            this.property_settings = property_settings;
        }
        try {
            this.file_handle = fs_1.default.openSync(file_path, 'r');
            let fstats = fs_1.default.fstatSync(this.file_handle);
            this.file_size = fstats.size;
            this.file_buffer = mmap_io_1.default.map(this.file_size, mmap_io_1.default.PROT_READ, mmap_io_1.default.MAP_PRIVATE, this.file_handle, 0, mmap_io_1.default.MADV_NORMAL);
            this.buff = new Buffer_parse_1.Buffer_parse(this.file_handle, this.file_buffer);
        }
        catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
    }
    free() {
        return mmap_io_1.default.incore(this.file_buffer);
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
            if (path_1.default.extname(this.file_basename) === '.osr') {
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
