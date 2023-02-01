import { score } from './score';
import { beatmap_results } from './beatmap_results';

export type scores_beatmap = {
    beatmap_md5: string;
    beatmap?: beatmap_results;
    scores: score[];
};

export type score_beatmap = {
    beatmap_md5?: string;
    beatmap?: beatmap_results;
    score: score;
};
