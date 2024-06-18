"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_concat_sr = void 0;
const path_1 = __importDefault(require("path"));
const osu_db_1 = require("../parsers/osu_db");
const property_settings_1 = require("../consts/property_settings");
const sr_keys = Object.keys({ star_rating_std: [], star_rating_taiko: [], star_rating_ctb: [], star_rating_mania: [] });
const osu_db_concat_sr = (db_1, db_2) => {
    var _a, _b, _c;
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
        return;
    }
    console.log('[ loading db 2 ]');
    const osu_db_2_result = (0, osu_db_1.osu_db_load)(path_1.default.join(db_2.folder_path, db_2.filename), [
        property_settings_1.beatmap_property.beatmap_md5,
        property_settings_1.beatmap_property.star_rating_std,
        property_settings_1.beatmap_property.star_rating_taiko,
        property_settings_1.beatmap_property.star_rating_ctb,
        property_settings_1.beatmap_property.star_rating_mania
    ], { print_progress: true });
    console.log('[ comparing ]');
    for (let i = 0; i < result.beatmaps.length; i++) {
        if (i % 1000 == 0) {
            console.log('compare', i, '/', result.beatmaps.length, `${(i / result.beatmaps.length * 100).toFixed(2)}`, 'maps');
        }
        if (!((_a = result.beatmaps[i]) === null || _a === void 0 ? void 0 : _a.beatmap_md5) || ((_c = (_b = result === null || result === void 0 ? void 0 : result.beatmaps[i]) === null || _b === void 0 ? void 0 : _b.beatmap_md5) === null || _c === void 0 ? void 0 : _c.length) !== 32) {
            continue;
        }
        const idx = osu_db_2_result.beatmaps.findIndex(v => v.beatmap_md5 === result.beatmaps[i].beatmap_md5);
        if (idx == -1) {
            continue;
        }
        for (let sr of sr_keys) {
            if (result.beatmaps[i][sr] && result.beatmaps[i][sr].length == 0) {
                if (osu_db_2_result.beatmaps[idx][sr].length > 0) {
                    result.beatmaps[i][sr] = osu_db_2_result.beatmaps[idx][sr];
                }
            }
        }
    }
    return result;
};
exports.osu_db_concat_sr = osu_db_concat_sr;
