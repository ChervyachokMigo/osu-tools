import * as osu_db from './osu_db';

var osu_db_result = osu_db.osu_file_load('E:/osu!/osu!.db', 
    [
        osu_db.osu_db_parse_setting.artist,
        osu_db.osu_db_parse_setting.title,
        osu_db.osu_db_parse_setting.difficulty,
        osu_db.osu_db_parse_setting.beatmap_md5,
        osu_db.osu_db_parse_setting.beatmap_id,
        osu_db.osu_db_parse_setting.beatmapset_id,
        osu_db.osu_db_parse_setting.gamemode,
        osu_db.osu_db_parse_setting.mod_date,
        osu_db.osu_db_parse_setting.mod_time,
        osu_db.osu_db_parse_setting.star_rating_taiko
    ]
);
console.log(osu_db_result);


