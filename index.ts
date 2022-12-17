
import { collection_db_load, collection_db_results } from './collection_db';
import { osu_db_load, osu_db_results} from './osu_db';
import { osu_db_parse_setting, osu_db_all_parse_settings, osu_db_none_parse_settings} from "./parse_settings";
import { get_collections_detailed } from './union';
 

var osu_db_settings = [
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

console.log(detailed_collections);

setTimeout(()=>{return true;}, 100000)




