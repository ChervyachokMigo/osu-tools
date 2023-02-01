"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_score_detailed = exports.get_scores_detailed = exports.get_collections_detailed = void 0;
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
function get_collections_detailed(collection_result, osu_db_results) {
    let updated_collection_result = {
        collections: Object.assign([], collection_result.collections),
        osu_version: collection_result === null || collection_result === void 0 ? void 0 : collection_result.osu_version
    };
    if (updated_collection_result.collections.length == 0) {
        return updated_collection_result;
    }
    console.log('start union collection db with osu db..');
    updated_collection_result.collections.map((collection) => {
        collection.beatmaps = [];
        console.log('reading collection', collection.name);
        if (collection.beatmaps_md5.length == 0) {
            console.log('no beatmaps');
            return;
        }
        for (let md5_hash of collection.beatmaps_md5) {
            let founded_beatmap = osu_db_results.beatmaps.filter(value => value.beatmap_md5 === md5_hash).shift();
            if (founded_beatmap !== undefined) {
                collection.beatmaps.push(founded_beatmap);
            }
            else {
                console.error('not found beatmap: ', md5_hash);
            }
        }
    });
    console.log('end union');
    return updated_collection_result;
}
exports.get_collections_detailed = get_collections_detailed;
function get_scores_detailed(scores_results, osu_db_results) {
    let updated_scores_results = Object.assign({}, {
        beatmaps_scores: scores_results === null || scores_results === void 0 ? void 0 : scores_results.beatmaps_scores,
        osu_version: scores_results === null || scores_results === void 0 ? void 0 : scores_results.osu_version
    });
    if (updated_scores_results.beatmaps_scores.length == 0) {
        return updated_scores_results;
    }
    console.log('start union scores db with osu db..');
    var i = 0;
    let one_percent_value = Math.trunc(updated_scores_results.beatmaps_scores.length / 100);
    updated_scores_results.beatmaps_scores.map((beatmap_scores) => {
        beatmap_scores.beatmap = {};
        if (beatmap_scores.beatmap_md5 === undefined) {
            console.log('no beatmap');
            return;
        }
        let founded_beatmap = osu_db_results.beatmaps.filter(value => value.beatmap_md5 === beatmap_scores.beatmap_md5).shift();
        if (founded_beatmap !== undefined) {
            beatmap_scores.beatmap = founded_beatmap;
        }
        else {
            console.error('not found beatmap: ', beatmap_scores.beatmap_md5);
        }
        //if ( i % one_percent_value == 0){
        console.log((Math.floor(i / updated_scores_results.beatmaps_scores.length * 10000) / 100), '% complete');
        //}
        i++;
    });
    console.log('end union');
    return updated_scores_results;
}
exports.get_scores_detailed = get_scores_detailed;
function get_score_detailed(score_result, osu_db_results) {
    let updated_score_result = Object.assign({}, {
        beatmap_md5: (score_result === null || score_result === void 0 ? void 0 : score_result.beatmap_md5) ? score_result.beatmap_md5 : undefined,
        score: score_result
    });
    if ((score_result === null || score_result === void 0 ? void 0 : score_result.beatmap_md5) === undefined) {
        console.error('no beatmap md5 hash');
        return updated_score_result;
    }
    console.log('start union score with osu db..');
    let founded_beatmap = osu_db_results.beatmaps.filter(value => value.beatmap_md5 === updated_score_result.beatmap_md5).shift();
    if (founded_beatmap !== undefined) {
        updated_score_result.beatmap = founded_beatmap;
    }
    else {
        console.error('not found beatmap: ', updated_score_result.beatmap_md5);
    }
    console.log('end union');
    return updated_score_result;
}
exports.get_score_detailed = get_score_detailed;
