"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replay = exports.scores_db = exports.collection_db = exports.osu_db = exports.songs = exports.all_properties = void 0;
const osu_db_1 = require("./parsers/osu_db");
const collection_db_1 = require("./parsers/collection_db");
const scores_db_1 = require("./parsers/scores_db");
const replay_osr_1 = require("./parsers/replay_osr");
const property_settings_1 = require("./consts/property_settings");
const scan_songs_1 = require("./parsers/scan_songs");
exports.all_properties = {
    beatmap: property_settings_1.all_beatmap_properties,
    score: property_settings_1.all_score_properties,
    osu_file: property_settings_1.all_osu_file_properties
};
exports.songs = {
    scan: scan_songs_1.get_all_beatmaps_from_songs
};
exports.osu_db = {
    load: osu_db_1.osu_db_load,
    find: osu_db_1.find_beatmaps,
};
exports.collection_db = {
    load: collection_db_1.collection_db_load,
};
exports.scores_db = {
    load: scores_db_1.scores_db_load,
};
exports.replay = {
    load: replay_osr_1.replay_load,
};
