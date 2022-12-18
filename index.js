"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const osu_db_1 = require("./osu_db");
const parse_settings_1 = require("./parse_settings");
var getted_beatmap_properties = [
    parse_settings_1.beatmap_property_name.beatmap_id,
    parse_settings_1.beatmap_property_name.beatmap_stats,
    parse_settings_1.beatmap_property_name.beatmapset_id,
    parse_settings_1.beatmap_property_name.artist,
    parse_settings_1.beatmap_property_name.title,
    parse_settings_1.beatmap_property_name.creator,
    parse_settings_1.beatmap_property_name.difficulty,
    parse_settings_1.beatmap_property_name.beatmap_md5
];
var osu_db_result = (0, osu_db_1.osu_db_load)('E:/osu!/osu!.db', getted_beatmap_properties);
(0, osu_db_1.find_beatmaps)(osu_db_result, (beatmap) => beatmap.beatmap_id && beatmap.beatmap_id < 100);
//var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')
//var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
//console.log(detailed_collections);
setTimeout(() => { return true; }, 100000);
