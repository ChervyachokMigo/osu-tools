"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_export_sr = exports.osu_db_concat_sr = void 0;
const path_1 = __importDefault(require("path"));
const osu_db_1 = require("../parsers/osu_db");
const property_settings_1 = require("../consts/property_settings");
const sr_keys = Object.keys({ star_rating_std: [], star_rating_taiko: [], star_rating_ctb: [], star_rating_mania: [] });
const sr_props = [
    property_settings_1.beatmap_property.beatmap_md5,
    property_settings_1.beatmap_property.star_rating_std,
    property_settings_1.beatmap_property.star_rating_taiko,
    property_settings_1.beatmap_property.star_rating_ctb,
    property_settings_1.beatmap_property.star_rating_mania
];
const osu_db_concat_sr = (db_1, db_2) => {
    var _a;
    if (!db_1.filename) {
        db_1.filename = 'osu!.db';
    }
    if (!db_2.filename) {
        db_2.filename = 'osu!.db';
    }
    console.log('[ loading db 1 ]');
    const result = (0, osu_db_1.osu_db_load)(path_1.default.join(db_1.folder_path, db_1.filename), property_settings_1.all_beatmap_properties, { print_progress: true });
    if (result.beatmaps.length == 0) {
        console.log('db 1 is empty');
        return result;
    }
    console.log('[ loading db 2 ]');
    const osu_db_2_result = (0, osu_db_1.osu_db_load)(path_1.default.join(db_2.folder_path, db_2.filename), sr_props, { print_progress: true });
    console.log('[ comparing ]');
    for (let i = 0; i < result.beatmaps.length; i++) {
        let beatmap = result.beatmaps[i];
        if (i % 1000 == 0) {
            console.log('compare', i, '/', result.beatmaps.length, `${(i / result.beatmaps.length * 100).toFixed(2)}`, 'maps');
        }
        if (!beatmap.beatmap_md5 || ((_a = beatmap.beatmap_md5) === null || _a === void 0 ? void 0 : _a.length) !== 32) {
            continue;
        }
        const beatmap_2 = osu_db_2_result.beatmaps.find(v => v.beatmap_md5 === beatmap.beatmap_md5);
        if (!beatmap_2) {
            continue;
        }
        let is_changed = false;
        for (let sr of sr_keys) {
            const beatmap_sr = beatmap[sr];
            const beatmap_2_sr = beatmap_2[sr];
            if (beatmap_sr && beatmap_sr.length == 0 && beatmap_2_sr.length > 0) {
                beatmap[sr] = beatmap_2_sr;
                is_changed = true;
            }
        }
        if (is_changed)
            result.beatmaps[i] = beatmap;
    }
    return result;
};
exports.osu_db_concat_sr = osu_db_concat_sr;
const osu_db_export_sr = (db_1, output) => {
    if (!db_1.filename) {
        db_1.filename = 'osu!.db';
    }
    console.log('[ loading db 1 ]');
    const result = (0, osu_db_1.osu_db_load)(path_1.default.join(db_1.folder_path, db_1.filename), sr_props, { print_progress: true });
    if (result.beatmaps.length == 0) {
        console.log('db 1 is empty');
        return;
    }
    console.log('[ exporting ]');
    const export_data = [];
    for (let beatmap of result.beatmaps) {
        if (!beatmap.beatmap_md5 || beatmap.beatmap_md5.length !== 32) {
            continue;
        }
        const save_srs = [];
        for (let sr of sr_keys) {
            if (beatmap[sr] && beatmap[sr].length == 0) {
                continue;
            }
            save_srs.push([sr_keys.indexOf(sr), beatmap[sr]]);
        }
        export_data.push([beatmap.beatmap_md5, save_srs]);
    }
};
exports.osu_db_export_sr = osu_db_export_sr;
