import { collection_db_results } from "../consts/collection_db_results";
import { osu_db_results } from "../consts/osu_db_results";
import { score } from '../consts/score';
import { scores_db_results } from '../parsers/scores_db';
import { score_beatmap } from '../consts/scores_beatmap';
/**
 * @param collection_result results from collection db class
 *
 * @param osu_db_results results from osu db class, **important!** strictly set `beatmap_md5` setting!
 *
 * @returns
 * detailed collection_result with array of beatmap_results
 *
 * @example
 *  var getted_beatmap_properties = [
    beatmap_property.beatmap_id,
    beatmap_property.beatmap_stats,
    beatmap_property.beatmapset_id,
    beatmap_property.artist,
    beatmap_property.title,
    beatmap_property.creator,
    beatmap_property.difficulty,
    beatmap_property.beatmap_md5
];

var osu_db_result: osu_db_results = osu_db_load(
    'E:/osu!/osu!.db' ,  getted_beatmap_properties
);

var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')
var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
console.log(detailed_collections);
 *  */
export declare function get_collections_detailed(collection_result: collection_db_results, osu_db_results: osu_db_results): collection_db_results;
export declare function get_scores_detailed(scores_results: scores_db_results, osu_db_results: osu_db_results): scores_db_results;
export declare function get_score_detailed(score_result: score, osu_db_results: osu_db_results): score_beatmap;
//# sourceMappingURL=union.d.ts.map