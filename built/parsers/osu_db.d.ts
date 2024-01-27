import { beatmap_property } from '../consts/property_settings';
import { osu_file } from './osu_file';
import { beatmap_results } from '../consts/beatmap_results';
import { osu_db_results } from '../consts/osu_db_results';
export declare class osu_db extends osu_file {
    property_settings_fast: boolean[];
    constructor(file_path: string, property_settings?: beatmap_property[]);
    osu_db_parse(): osu_db_results;
    private beatmap_parse;
}
/**
 * @returns osu_db_results with all beatmaps information
 * @param osu_db_path - absolute path to osu.db
 * @also use `all_beatmap_properties` for set all beatmap settings
 */
export declare function osu_db_load(osu_db_path: string, parse_settings?: Array<beatmap_property>): osu_db_results;
type SearchFunction = (beatmap: beatmap_results) => any;
/**
 * @param osu_db_result osu_db_results object from load osu.db
 * @param search_function any function for find beatmap, need return boolean
 * @returns `array of beatmaps_results` of search by search function expression
 * @example
 * //returns all beatmaps with id < 100
 * find_beatmaps( osu_db_result, (beatmap) => beatmap.beatmap_id && beatmap.beatmap_id < 100 );
 */
export declare function osu_db_find_beatmaps(osu_db_result: osu_db_results, search_function: SearchFunction): beatmap_results[];
export {};
//# sourceMappingURL=osu_db.d.ts.map