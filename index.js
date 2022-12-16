"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const osu_db = __importStar(require("./osu_db"));
var osu_db_result = osu_db.osu_file_load('E:/osu!/osu!.db', [
    osu_db.osu_db_parse_setting.artist,
    osu_db.osu_db_parse_setting.title,
    osu_db.osu_db_parse_setting.difficulty,
    osu_db.osu_db_parse_setting.beatmap_md5,
    osu_db.osu_db_parse_setting.beatmap_id,
    osu_db.osu_db_parse_setting.beatmapset_id,
    osu_db.osu_db_parse_setting.gamemode,
    osu_db.osu_db_parse_setting.mod_date,
    osu_db.osu_db_parse_setting.mod_time,
    osu_db.osu_db_parse_setting.star_rating_taiko
]);
console.log(osu_db_result);
