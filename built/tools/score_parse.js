"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.score_parse = void 0;
const property_settings_1 = require("../consts/property_settings");
const variable_types_1 = require("../consts/variable_types");
const modes_1 = require("../consts/modes");
function score_parse(buffer, property_settings) {
    let score = {};
    if (property_settings.indexOf(property_settings_1.score_property.gamemode) != -1) {
        score.gamemode_int = buffer.getByte();
        score.gamemode = variable_types_1.Gamemode[score.gamemode_int];
    }
    else {
        buffer.skipByte();
    }
    if (property_settings.indexOf(property_settings_1.score_property.score_version) != -1) {
        score.score_version = buffer.getInt();
    }
    else {
        buffer.skipInt();
    }
    if (property_settings.indexOf(property_settings_1.score_property.beatmap_md5) != -1) {
        score.beatmap_md5 = buffer.getString();
    }
    else {
        buffer.skipString();
    }
    if (property_settings.indexOf(property_settings_1.score_property.playername) != -1) {
        score.playername = buffer.getStringAsBuffer();
    }
    else {
        buffer.skipString();
    }
    if (property_settings.indexOf(property_settings_1.score_property.replay_md5) != -1) {
        score.replay_md5 = buffer.getString();
    }
    else {
        buffer.skipString();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_300) != -1) {
        score.count_300 = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_100) != -1) {
        score.count_100 = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_50) != -1) {
        score.count_50 = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_geki) != -1) {
        score.count_geki = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_katu) != -1) {
        score.count_katu = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.count_miss) != -1) {
        score.count_miss = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.scores) != -1) {
        score.scores = buffer.getUInt();
    }
    else {
        buffer.skipInt();
    }
    if (property_settings.indexOf(property_settings_1.score_property.combo) != -1) {
        score.combo = buffer.getShort();
    }
    else {
        buffer.skipShort();
    }
    if (property_settings.indexOf(property_settings_1.score_property.is_fc) != -1) {
        score.is_fc = buffer.getBool();
    }
    else {
        buffer.skipBool();
    }
    const mods_int = buffer.getInt();
    const mods = (0, modes_1.ModsIntToShortText)(mods_int);
    if (property_settings.indexOf(property_settings_1.score_property.is_fc) != -1) {
        score.mods_int = mods_int;
        score.mods = mods;
    } // else nothing
    const hp_bar = buffer.getHpBar();
    if (property_settings.indexOf(property_settings_1.score_property.hp_bar) != -1) {
        if (hp_bar.length > 0) {
            score.hp_bar = hp_bar;
        }
    } //else nothing
    if (property_settings.indexOf(property_settings_1.score_property.date) != -1) {
        score.windows_tick_date = buffer.getWindowsTickDate();
    }
    else {
        buffer.skipDateTime();
    }
    const replay_data = buffer.getReplayData();
    if (property_settings.indexOf(property_settings_1.score_property.replay_data) != -1) {
        if (replay_data.replay_frames.length > 0) {
            score.replay_data = replay_data;
        }
    } //else nothing
    //let replay_data_buffer = await osufile.getStringBytes(replay_data_length);
    if (property_settings.indexOf(property_settings_1.score_property.online_id) != -1) {
        score.online_id = buffer.getLong();
    }
    else {
        buffer.skipLong();
    }
    if (mods.indexOf('Target') != -1) {
        if (property_settings.indexOf(property_settings_1.score_property.target_practice_accuracy) != -1) {
            score.target_practice_accuracy = buffer.getDouble();
        }
        else {
            buffer.skipDouble();
        }
    }
    return score;
}
exports.score_parse = score_parse;
