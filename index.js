"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const osu_db_1 = require("./osu_db");
const parse_settings_1 = require("./parse_settings");
var osu_db_settings = [
    parse_settings_1.osu_db_parse_setting.title,
    parse_settings_1.osu_db_parse_setting.gamemode,
    parse_settings_1.osu_db_parse_setting.star_rating_taiko,
    parse_settings_1.osu_db_parse_setting.ranked_status,
    parse_settings_1.osu_db_parse_setting.ranked_status,
];
var osu_db_result = (0, osu_db_1.osu_db_load)('E:/osu!/osu!.db', 
//'D:/osu!.db',
osu_db_settings);
console.log(osu_db_result);
setTimeout(() => { return true; }, 100000);
