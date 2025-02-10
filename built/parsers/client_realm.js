"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_beatmap_file = exports.set_laser_files_path = exports.close_realm = exports.get_realm_objects = exports.open_realm = void 0;
const realm_1 = __importDefault(require("realm"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const scan_songs_1 = require("./scan_songs");
const property_settings_1 = require("../consts/property_settings");
let realm = null;
let laser_files_path = null;
const open_realm = (file_path) => {
    realm = new realm_1.default({
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
const set_laser_files_path = (files_path) => {
    const files_path_parsed = path_1.default.parse(files_path);
    let storage_path = null;
    if (files_path_parsed.name === 'files') {
        storage_path = files_path;
    }
    else {
        const path_with_files = path_1.default.join(files_path, 'files');
        if ((0, fs_1.existsSync)(path_with_files)) {
            storage_path = path_with_files;
        }
        else {
            throw new Error(`osu laser files ${path_with_files} not exists.`);
        }
    }
    laser_files_path = storage_path;
};
exports.set_laser_files_path = set_laser_files_path;
const get_beatmap_file = (hash, raw = true, osu_file_beatmap_properties = property_settings_1.all_osu_file_properties, options = scan_songs_1.default_scanner_options) => {
    const second = hash.slice(0, 2);
    const first = second.slice(0, 1);
    const file_path = path_1.default.join(laser_files_path, first, second, hash);
    if (!(0, fs_1.existsSync)(file_path)) {
        throw new Error(`Beatmap file ${file_path} not exists.`);
    }
    if (raw) {
        return (0, fs_1.readFileSync)(file_path, { encoding: 'utf-8' });
        ;
    }
    else {
        return (0, scan_songs_1.parse_osu_file)(file_path, osu_file_beatmap_properties, options);
    }
};
exports.get_beatmap_file = get_beatmap_file;
