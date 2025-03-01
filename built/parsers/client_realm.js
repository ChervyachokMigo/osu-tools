"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.export_beatmapset = exports.get_beatmapset_files = exports.find_beatmapset_files = exports.get_laser_beatmap_file_path = exports.get_laser_beatmap_file = exports.set_laser_files_path = exports.close_realm = exports.get_realm_objects = exports.open_realm = void 0;
const realm_1 = __importDefault(require("realm"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const scan_songs_1 = require("./scan_songs");
const property_settings_1 = require("../consts/property_settings");
const escape_string_1 = require("../tools/escape_string");
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
    const files_path_parsed = node_path_1.default.parse(files_path);
    let storage_path = null;
    if (files_path_parsed.name === 'files') {
        storage_path = files_path;
    }
    else {
        const path_with_files = node_path_1.default.join(files_path, 'files');
        if ((0, node_fs_1.existsSync)(path_with_files)) {
            storage_path = path_with_files;
        }
        else {
            throw new Error(`osu laser files ${path_with_files} not exists.`);
        }
    }
    laser_files_path = storage_path;
};
exports.set_laser_files_path = set_laser_files_path;
const get_laser_beatmap_file = (hash, raw = true, osu_file_beatmap_properties = property_settings_1.all_osu_file_properties, options = scan_songs_1.default_scanner_options) => {
    if (!hash) {
        throw new Error('Beatmap hash is required.');
    }
    const second = hash.slice(0, 2);
    const first = second.slice(0, 1);
    const file_path = node_path_1.default.join(laser_files_path, first, second, hash);
    if (!(0, node_fs_1.existsSync)(file_path)) {
        throw new Error(`Beatmap file ${file_path} not exists.`);
    }
    if (raw) {
        return (0, node_fs_1.readFileSync)(file_path, { encoding: 'utf-8' });
        ;
    }
    else {
        return (0, scan_songs_1.parse_osu_file)(file_path, osu_file_beatmap_properties, options);
    }
};
exports.get_laser_beatmap_file = get_laser_beatmap_file;
const get_laser_beatmap_file_path = (hash) => {
    if (!hash) {
        throw new Error('Beatmap hash is required.');
    }
    const second = hash.slice(0, 2);
    const first = second.slice(0, 1);
    return node_path_1.default.join(laser_files_path, first, second, hash);
};
exports.get_laser_beatmap_file_path = get_laser_beatmap_file_path;
const find_beatmapset_files = (beatmapsets, ID) => {
    if (ID < 1) {
        console.error('Beatmapset ID must be greater than 0.');
        return { foldername: '', files: [] };
    }
    const beatmapset = beatmapsets.find(v => v.OnlineID == ID);
    if (!beatmapset) {
        console.error(`Beatmapset with ID ${ID} not found.`);
        return { foldername: '', files: [] };
    }
    return (0, exports.get_beatmapset_files)(beatmapset);
};
exports.find_beatmapset_files = find_beatmapset_files;
const get_beatmapset_files = (beatmapset) => {
    const beatmaps = beatmapset.Beatmaps;
    if (beatmaps.length === 0) {
        console.error(`Beatmapset ${beatmapset.OnlineID} has no beatmaps.`);
        return { foldername: '', files: [] };
    }
    const beatmap_meatadata = beatmaps[0].Metadata;
    const foldername = (0, escape_string_1.escape_string)(`${beatmapset.OnlineID} ${beatmap_meatadata.Artist} - ${beatmap_meatadata.Title}`);
    const beatmap_files = beatmapset.Files
        .map((v) => ({
        filename: v.Filename,
        filehash: v.File.Hash,
        filepath: (0, exports.get_laser_beatmap_file_path)(v.File.Hash),
    }));
    return { foldername, files: beatmap_files };
};
exports.get_beatmapset_files = get_beatmapset_files;
const export_beatmapset = (beatmapset, export_path, out_result = false) => {
    const beatmapset_files = (0, exports.get_beatmapset_files)(beatmapset);
    if (beatmapset_files.files.length === 0) {
        return;
    }
    for (let file of beatmapset_files.files) {
        const dest_path = node_path_1.default.join(export_path, beatmapset_files.foldername, file.filename);
        if (!(0, node_fs_1.existsSync)(node_path_1.default.dirname(dest_path))) {
            (0, node_fs_1.mkdirSync)(node_path_1.default.dirname(dest_path), { recursive: true });
        }
        (0, node_fs_1.copyFileSync)(file.filepath, dest_path);
        //console.log(`Exported ${file.filename} to ${dest_path}`);
    }
    ;
    if (out_result) {
        console.log(`Exported beatmapset ${beatmapset_files.foldername}`);
    }
    return Object.assign(Object.assign({}, beatmapset_files), { exported_path: node_path_1.default.join(export_path, beatmapset_files.foldername) });
};
exports.export_beatmapset = export_beatmapset;
