import { collection_db_results } from './collection_db';
import { osu_db_results } from './osu_db';

/**
 * @param collection_result results from collection db class
 * 
 * @param osu_db_results results from osu db class, **important!** strictly set `beatmap_md5` setting!
 * 
 * @returns 
 * detailed collection_result with array of beatmap_results 
 * 
 * @example
 *  var osu_db_settings = [
        osu_db_parse_setting.beatmap_id,
        osu_db_parse_setting.beatmap_stats,
        osu_db_parse_setting.beatmapset_id,
        osu_db_parse_setting.artist,
        osu_db_parse_setting.title,
        osu_db_parse_setting.creator,
        osu_db_parse_setting.difficulty,
        osu_db_parse_setting.beatmap_md5
    ];

    var osu_db_result: osu_db_results = osu_db_load(
        'E:/osu!/osu!.db' ,  osu_db_settings
    );

    var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')

    var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
`
 *  */
export function get_collections_detailed (
    collection_result: collection_db_results, 
    osu_db_results: osu_db_results): collection_db_results {

        if (collection_result.collections.length == 0) {
            return collection_result;
        }

        console.log('start union collection db with osu db..');

        let updated_collection_result = Object.assign({}, collection_result);

        for (let i = 0; i < updated_collection_result.collections.length; i++){

            console.log('reading collection',updated_collection_result.collections[i].name);

            updated_collection_result.collections[i].beatmaps = [];

            if (updated_collection_result.collections[i].md5_hashes.length == 0){
                console.log('no beatmaps');
                continue;
            }

            for (let md5_hash of updated_collection_result.collections[i].md5_hashes){
                let founded_beatmap = osu_db_results.beatmaps.filter(value=> value.beatmap_md5 === md5_hash);
                if (founded_beatmap.length > 0){
                    updated_collection_result.collections[i].beatmaps?.push(founded_beatmap[0]);
                } else {
                    console.error('not found beatmap: ', md5_hash);
                }
            }
        }

        console.log('end union');

        return updated_collection_result;

}