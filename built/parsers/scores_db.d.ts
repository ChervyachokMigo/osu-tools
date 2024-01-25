import { osu_file } from './osu_file';
import { score_property } from '../consts/property_settings';
import { scores_beatmap } from '../consts/scores_beatmap';
export declare type scores_db_results = {
    osu_version?: number;
    beatmaps_scores: scores_beatmap[];
};
export declare class scores_db extends osu_file {
    constructor(file_path: string, property_settings?: Array<score_property>);
    scores_db_parse(): scores_db_results;
}
/**
 * @returns scores_db_results with beatmaps includes scores
 * @param scores_db_path - absolute path to scores.db
 */
export declare function scores_db_load(scores_db_path: string, score_properties: score_property[]): scores_db_results;
//# sourceMappingURL=scores_db.d.ts.map