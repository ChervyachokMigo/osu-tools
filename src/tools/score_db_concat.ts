import { score } from "../consts/score";
import { scores_beatmap } from "../consts/scores_beatmap";
import { scores_db_results } from "../parsers/scores_db";

export const scores_db_concat = (score_1: scores_db_results, score_2: scores_db_results) => {
    let result: scores_db_results = {
        osu_version: score_1.osu_version,
        beatmaps_scores: []
    };

    for (let beatmap of score_1.beatmaps_scores){
        let scores: score[] = Object.assign([], beatmap.scores);

        result.beatmaps_scores.push({
            beatmap_md5: beatmap.beatmap_md5,
            scores: scores,
        });
    }
    
    for (let beatmap of score_2.beatmaps_scores){
        let k = result.beatmaps_scores.findIndex(v => v.beatmap_md5 === beatmap.beatmap_md5);
        if (k>-1){
            for (let score of beatmap.scores){
                if (score.playername?.toString() === 'SadGod' ){
                    if (result.beatmaps_scores[k].scores.findIndex ( v => v.replay_md5 === score.replay_md5 ) === -1){
                        result.beatmaps_scores[k].scores.push(score);
                    }
                }
            }
        } else {
            result.beatmaps_scores.push(beatmap);
        }
    }
    return result;
}