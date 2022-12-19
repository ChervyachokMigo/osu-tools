import { collection_db_load, collection_db_results } from './parsers/collection_db';
import { find_beatmaps, osu_db_load, osu_db_results} from './parsers/osu_db';
import { beatmap_property, all_beatmap_properties, all_score_properties} from "./consts/parse_settings";
import { get_collections_detailed } from './tools/union';
import { beatmap_results } from './consts/beatmap_results';
import { scores_db_load } from './parsers/scores_db';

var getted_beatmap_properties = [
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

var founded_beatmaps = find_beatmaps( osu_db_result, (beatmap) =>  beatmap.beatmap_id && beatmap.beatmap_id < 100 );
console.log(founded_beatmaps);

var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')

var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
console.log(detailed_collections);

var scores_db_result = scores_db_load('E:/osu!/scores.db', all_score_properties);
console.log(scores_db_result);

setTimeout(()=>{return true;}, 100000)




