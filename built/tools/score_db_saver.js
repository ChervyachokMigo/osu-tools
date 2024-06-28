"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scores_db_save = void 0;
const fs_1 = require("fs");
const buffer_saver_1 = require("./buffer_saver");
const scores_db_save = (scores, file_path = 'scores.db') => {
    let buffer = new buffer_saver_1.buffer_saver();
    buffer.addInt(scores.osu_version);
    buffer.addInt(scores.beatmaps_scores.length);
    for (let beatmap of scores.beatmaps_scores) {
        buffer.addString(beatmap.beatmap_md5);
        buffer.addInt(beatmap.scores.length);
        for (let score of beatmap.scores) {
            buffer.addByte(score.gamemode_int);
            buffer.addInt(score.score_version);
            buffer.addString(score.beatmap_md5);
            buffer.addString(score.playername);
            buffer.addString(score.replay_md5);
            buffer.addShort(score.count_300);
            buffer.addShort(score.count_100);
            buffer.addShort(score.count_50);
            buffer.addShort(score.count_geki);
            buffer.addShort(score.count_katu);
            buffer.addShort(score.count_miss);
            buffer.addInt(score.scores);
            buffer.addShort(score.combo);
            buffer.addBool(score.is_fc);
            buffer.addInt(score.mods_int);
            buffer.addByte(0);
            buffer.addWindowTickrate(score.windows_tick_date);
            buffer.addUInt(0xffffffff);
            buffer.addLong(score.online_id);
            if (score.mods && score.mods.indexOf('Target') > -1) {
                buffer.addDouble(score.target_practice_accuracy);
            }
        }
    }
    (0, fs_1.writeFileSync)(file_path, buffer.getBuffer(), { encoding: 'binary' });
};
exports.scores_db_save = scores_db_save;
