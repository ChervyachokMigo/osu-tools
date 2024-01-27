import { scores_db_results } from "../parsers/scores_db";

export const scores_db_concat = (score_1: scores_db_results, score_2: scores_db_results) => {
    const beatmaps_md5s = new Set(score_1.beatmaps_scores.map( v => v.beatmap_md5));
    let result = score_1;
    for (let i in score_2.beatmaps_scores){
        if (beatmaps_md5s.has(score_2.beatmaps_scores[i].beatmap_md5)){
            let k = result.beatmaps_scores.findIndex(v => v.beatmap_md5 === score_2.beatmaps_scores[i].beatmap_md5);
            result.beatmaps_scores[k].scores = result.beatmaps_scores[k].scores.concat(score_2.beatmaps_scores[i].scores);
            result.beatmaps_scores[k].scores = result.beatmaps_scores[k].scores.filter( (v, i, s) => s.findIndex( g => g.replay_md5 === v.replay_md5) === i );
        } else {
            result.beatmaps_scores.push(score_2.beatmaps_scores[i]);
        }
    }
    return result;
}