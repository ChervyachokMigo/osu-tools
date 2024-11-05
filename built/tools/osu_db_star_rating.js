"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_import_sr = exports.load_sr = exports.osu_db_export_sr = exports.save_sr = exports.osu_db_concat_sr = void 0;
const path_1 = __importDefault(require("path"));
const osu_db_1 = require("../parsers/osu_db");
const property_settings_1 = require("../consts/property_settings");
const osu_db_saver_1 = require("./osu_db_saver");
const buffer_saver_1 = require("./buffer_saver");
const fs_1 = require("fs");
const raw_file_1 = require("../parsers/raw_file");
const display_progress_1 = require("./display_progress");
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
    (0, display_progress_1.display_progress_reset)();
    const one_percent_value = Math.trunc(result.beatmaps.length / 100);
    for (let i = 0; i < result.beatmaps.length; i++) {
        let beatmap = result.beatmaps[i];
        if (i % one_percent_value == 0) {
            (0, display_progress_1.display_progress)({
                counter: i,
                length: result.beatmaps.length,
                one_percent: one_percent_value,
                is_display_time: false,
                is_print_progress: true
            });
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
const save_sr = (version, data, output) => {
    let buffer = new buffer_saver_1.buffer_saver();
    buffer.addInt(version);
    buffer.addInt(data.length);
    for (let beatmap of data) {
        buffer.addString(beatmap.beatmap_md5);
        buffer.addByte(Object.keys(beatmap.star_ratings).length);
        for (let x of Object.entries(beatmap.star_ratings)) {
            buffer.addByte(sr_keys.indexOf(x[0]));
            buffer.addStarRatings(x[1]);
        }
    }
    (0, fs_1.writeFileSync)(output, buffer.getBuffer(), { encoding: 'binary' });
};
exports.save_sr = save_sr;
const osu_db_export_sr = (input_db, output_raw) => {
    if (!input_db.filename) {
        input_db.filename = 'osu!.db';
    }
    console.log('[ loading db 1 ]');
    const osu_db = (0, osu_db_1.osu_db_load)(path_1.default.join(input_db.folder_path, input_db.filename), sr_props, { print_progress: true });
    if (osu_db.beatmaps.length == 0) {
        console.log('db 1 is empty');
        return;
    }
    console.log('[ exporting ]');
    const srs = [];
    for (let beatmap of osu_db.beatmaps) {
        if (!beatmap.beatmap_md5 || beatmap.beatmap_md5.length !== 32) {
            continue;
        }
        const save_srs = {};
        for (let sr of sr_keys) {
            if (beatmap[sr] && beatmap[sr].length == 0) {
                continue;
            }
            save_srs[sr] = beatmap[sr];
        }
        if (Object.keys(save_srs).length == 0) {
            continue;
        }
        srs.push({ beatmap_md5: beatmap.beatmap_md5, star_ratings: save_srs });
    }
    (0, exports.save_sr)(osu_db.osu_version, srs, output_raw);
};
exports.osu_db_export_sr = osu_db_export_sr;
const load_sr = (raw_path) => {
    const results = [];
    console.log('[ loading raw data ]');
    const file = new raw_file_1.raw_file(raw_path);
    const version = file.buff.getInt();
    const beatmaps_length = file.buff.getInt();
    for (let i = 0; i < beatmaps_length; i++) {
        if (i % 1000 == 0) {
            process.stdout.write(`compare ${i}/${beatmaps_length} (${(i / beatmaps_length * 100).toFixed(2)}%)\r`);
        }
        const beatmap = {
            beatmap_md5: file.buff.getString(),
            star_ratings: {}
        };
        const star_ratings_length = file.buff.getByte();
        for (let j = 0; j < star_ratings_length; j++) {
            const star_rating_key = sr_keys[file.buff.getByte()];
            const star_ratings = file.buff.getStarRatings();
            beatmap.star_ratings[star_rating_key] = star_ratings;
        }
        results.push(beatmap);
    }
    file.close();
    return { version, beatmaps: results };
};
exports.load_sr = load_sr;
const osu_db_import_sr = (input_raw, osu_db, output_db) => {
    var _a;
    if (!output_db.filename) {
        output_db.filename = 'osu!.db';
    }
    if (osu_db.beatmaps.length == 0) {
        console.log('db is empty');
        return;
    }
    osu_db.osu_version = input_raw.version;
    console.log('[ comparing ]');
    const sr_set = new Set(input_raw.beatmaps.map(x => x.beatmap_md5));
    for (let i = 0; i < osu_db.beatmaps.length; i++) {
        if (i % 1000 == 0) {
            process.stdout.write(`compare ${i}/${osu_db.beatmaps.length} (${(i / osu_db.beatmaps.length * 100).toFixed(2)}%)\r`);
        }
        if (!sr_set.has(osu_db.beatmaps[i].beatmap_md5)) {
            continue;
        }
        if (!osu_db.beatmaps[i].beatmap_md5 || ((_a = osu_db.beatmaps[i].beatmap_md5) === null || _a === void 0 ? void 0 : _a.length) !== 32) {
            continue;
        }
        const idx = input_raw.beatmaps.findIndex(v => v.beatmap_md5 === osu_db.beatmaps[i].beatmap_md5);
        for (let sr of sr_keys) {
            osu_db.beatmaps[i][sr] = input_raw.beatmaps[idx];
        }
    }
    console.log('[ saving ]');
    (0, osu_db_saver_1.osu_db_save)(osu_db, path_1.default.join(output_db.folder_path, output_db.filename), { print_progress: true });
};
exports.osu_db_import_sr = osu_db_import_sr;
