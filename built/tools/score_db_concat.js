"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scores_db_concat = void 0;
const scores_db_concat = (score_1, score_2) => {
    var _a;
    let result = {
        osu_version: score_1.osu_version,
        beatmaps_scores: []
    };
    for (let beatmap of score_1.beatmaps_scores) {
        let scores = Object.assign([], beatmap.scores);
        result.beatmaps_scores.push({
            beatmap_md5: beatmap.beatmap_md5,
            scores: scores,
        });
    }
    for (let beatmap of score_2.beatmaps_scores) {
        let k = result.beatmaps_scores.findIndex(v => v.beatmap_md5 === beatmap.beatmap_md5);
        if (k > -1) {
            for (let score of beatmap.scores) {
                if (((_a = score.playername) === null || _a === void 0 ? void 0 : _a.toString()) === 'SadGod') {
                    if (result.beatmaps_scores[k].scores.findIndex(v => v.replay_md5 === score.replay_md5) === -1) {
                        result.beatmaps_scores[k].scores.push(score);
                    }
                }
            }
        }
        else {
            result.beatmaps_scores.push(beatmap);
        }
    }
    return result;
};
exports.scores_db_concat = scores_db_concat;
