import {osu_db_load, osu_db_results} from './osu_db';
import {osu_db_parse_setting} from "./parse_settings";
 

var osu_db_settings = [
    osu_db_parse_setting.title,
    osu_db_parse_setting.gamemode,
    osu_db_parse_setting.star_rating_taiko,
    osu_db_parse_setting.ranked_status,
    osu_db_parse_setting.ranked_status,
];

var osu_db_result: osu_db_results = osu_db_load(
    'E:/osu!/osu!.db', 
    //'D:/osu!.db',
    osu_db_settings
);

console.log(osu_db_result );

setTimeout(()=>{return true;}, 100000)




