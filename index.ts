
import { collection_db_load, collection_db_results } from './collection_db';
import { find_beatmaps, osu_db_load, osu_db_results} from './osu_db';
import { beatmap_property_name, all_beatmap_properties, osu_db_none_parse_settings} from "./parse_settings";
import { get_collections_detailed } from './union';
import { beatmap_results } from './beatmap_results';

var getted_beatmap_properties = [
    beatmap_property_name.beatmap_id,
    beatmap_property_name.beatmap_stats,
    beatmap_property_name.beatmapset_id,
    beatmap_property_name.artist,
    beatmap_property_name.title,
    beatmap_property_name.creator,
    beatmap_property_name.difficulty,
    beatmap_property_name.beatmap_md5
];

var osu_db_result: osu_db_results = osu_db_load(
    'E:/osu!/osu!.db' ,  getted_beatmap_properties
);

find_beatmaps( osu_db_result, (beatmap) => beatmap.beatmap_id && beatmap.beatmap_id < 100 );

//var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')
//var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
//console.log(detailed_collections);

setTimeout(()=>{return true;}, 100000)




