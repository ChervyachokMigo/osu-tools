import { db_filepath } from "../consts/db_filepath";
import { osu_db_results } from "../consts/osu_db_results";
import { beatmap_star_ratings, sr_raw_result } from "../consts/star_ratings";
export declare const osu_db_concat_sr: (db_1: db_filepath, db_2: db_filepath) => osu_db_results;
export declare const save_sr: (version: number, data: beatmap_star_ratings[], output: string) => void;
export declare const osu_db_export_sr: (input_db: db_filepath, output_raw: string) => void;
export declare const load_sr: (raw_path: string) => sr_raw_result;
export declare const osu_db_import_sr: (input_raw: string, input_db: db_filepath, output_db: db_filepath) => void;
//# sourceMappingURL=osu_db_star_rating.d.ts.map