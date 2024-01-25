import { score } from './score';
import { beatmap_results } from './beatmap_results';
export declare type scores_beatmap = {
    beatmap_md5: string;
    beatmap?: beatmap_results;
    scores: score[];
};
export declare type score_beatmap = {
    beatmap_md5?: string;
    beatmap?: beatmap_results;
    score: score;
};
//# sourceMappingURL=scores_beatmap.d.ts.map