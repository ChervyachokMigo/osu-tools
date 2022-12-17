"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_db_1 = require("./collection_db");
const osu_db_1 = require("./osu_db");
const parse_settings_1 = require("./parse_settings");
const union_1 = require("./union");
var osu_db_settings = [
    parse_settings_1.osu_db_parse_setting.beatmap_id,
    parse_settings_1.osu_db_parse_setting.beatmap_stats,
    parse_settings_1.osu_db_parse_setting.beatmapset_id,
    parse_settings_1.osu_db_parse_setting.artist,
    parse_settings_1.osu_db_parse_setting.title,
    parse_settings_1.osu_db_parse_setting.creator,
    parse_settings_1.osu_db_parse_setting.difficulty,
    parse_settings_1.osu_db_parse_setting.beatmap_md5
];
var osu_db_result = (0, osu_db_1.osu_db_load)('E:/osu!/osu!.db', osu_db_settings);
var collection_db_result = (0, collection_db_1.collection_db_load)('E:/osu!/collection.db');
var detailed_collections = (0, union_1.get_collections_detailed)(collection_db_result, osu_db_result);
console.log(detailed_collections);
setTimeout(() => { return true; }, 100000);
