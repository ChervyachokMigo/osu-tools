import { db_filepath } from "../consts/db_filepath";
import { StarRating } from "../consts/variable_types";
import { osu_db_results } from "../consts/osu_db_results";
type star_ratings = {
    star_rating_std?: StarRating[];
    star_rating_taiko?: StarRating[];
    star_rating_ctb?: StarRating[];
    star_rating_mania?: StarRating[];
};
type beatmap_star_ratings = {
    beatmap_md5: string;
    star_ratings: star_ratings;
};
export declare const osu_db_concat_sr: (db_1: db_filepath, db_2: db_filepath) => osu_db_results;
export declare const save_sr: (data: beatmap_star_ratings[], output: string) => void;
export declare const osu_db_export_sr: (input_db: db_filepath, output_raw: string) => void;
export declare const load_sr: (raw_path: string) => beatmap_star_ratings[];
export declare const osu_db_import_sr: (input_raw: string, input_db: db_filepath, output_db: db_filepath) => void;
export {};
//# sourceMappingURL=osu_db_star_rating.d.ts.map