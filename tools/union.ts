import { collection_db_results,  collection } from '../parsers/collection_db';
import { osu_db_results } from '../parsers/osu_db';

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
export function get_collections_detailed (
    collection_result: collection_db_results, 
    osu_db_results: osu_db_results): collection_db_results {

        let updated_collection_result: collection_db_results = {
            collections: Object.assign( [], collection_result.collections ),
            osu_version: collection_result?.osu_version
        }
        

        if (updated_collection_result.collections.length == 0) {
            return updated_collection_result;
        }

        console.log('start union collection db with osu db..');

        updated_collection_result.collections.map( ( collection:collection ) => {
            collection.beatmaps = [];
            console.log('reading collection',collection.name);

            if (collection.beatmaps_md5.length == 0){
                console.log('no beatmaps');
                return;
            }

            for (let md5_hash of collection.beatmaps_md5){
                let founded_beatmap = osu_db_results.beatmaps.filter(value=> value.beatmap_md5 === md5_hash).shift();
                if (founded_beatmap !== undefined){
                    collection.beatmaps.push(founded_beatmap);
                } else {
                    console.error('not found beatmap: ', md5_hash);
                }
            }
        });

        console.log('end union');

        return updated_collection_result;

}