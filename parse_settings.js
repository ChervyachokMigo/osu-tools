"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_none_parse_settings = exports.osu_db_all_parse_settings = exports.osu_db_parse_setting = void 0;
var osu_db_parse_setting;
(function (osu_db_parse_setting) {
    osu_db_parse_setting[osu_db_parse_setting["beatmap_size"] = 0] = "beatmap_size";
    osu_db_parse_setting[osu_db_parse_setting["artist"] = 1] = "artist";
    osu_db_parse_setting[osu_db_parse_setting["artist_unicode"] = 2] = "artist_unicode";
    osu_db_parse_setting[osu_db_parse_setting["title"] = 3] = "title";
    osu_db_parse_setting[osu_db_parse_setting["title_unicode"] = 4] = "title_unicode";
    osu_db_parse_setting[osu_db_parse_setting["creator"] = 5] = "creator";
    osu_db_parse_setting[osu_db_parse_setting["difficulty"] = 6] = "difficulty";
    osu_db_parse_setting[osu_db_parse_setting["audio_filename"] = 7] = "audio_filename";
    osu_db_parse_setting[osu_db_parse_setting["beatmap_md5"] = 8] = "beatmap_md5";
    osu_db_parse_setting[osu_db_parse_setting["osu_filename"] = 9] = "osu_filename";
    osu_db_parse_setting[osu_db_parse_setting["ranked_status"] = 10] = "ranked_status";
    osu_db_parse_setting[osu_db_parse_setting["number_hitcircles"] = 11] = "number_hitcircles";
    osu_db_parse_setting[osu_db_parse_setting["number_sliders"] = 12] = "number_sliders";
    osu_db_parse_setting[osu_db_parse_setting["number_spinners"] = 13] = "number_spinners";
    osu_db_parse_setting[osu_db_parse_setting["mod_date"] = 14] = "mod_date";
    osu_db_parse_setting[osu_db_parse_setting["beatmap_stats"] = 15] = "beatmap_stats";
    osu_db_parse_setting[osu_db_parse_setting["slider_velocity"] = 16] = "slider_velocity";
    osu_db_parse_setting[osu_db_parse_setting["star_rating_std"] = 17] = "star_rating_std";
    osu_db_parse_setting[osu_db_parse_setting["star_rating_taiko"] = 18] = "star_rating_taiko";
    osu_db_parse_setting[osu_db_parse_setting["star_rating_ctb"] = 19] = "star_rating_ctb";
    osu_db_parse_setting[osu_db_parse_setting["star_rating_mania"] = 20] = "star_rating_mania";
    osu_db_parse_setting[osu_db_parse_setting["drain_time"] = 21] = "drain_time";
    osu_db_parse_setting[osu_db_parse_setting["total_time"] = 22] = "total_time";
    osu_db_parse_setting[osu_db_parse_setting["preview_time"] = 23] = "preview_time";
    osu_db_parse_setting[osu_db_parse_setting["timing_points"] = 24] = "timing_points";
    osu_db_parse_setting[osu_db_parse_setting["beatmap_id"] = 25] = "beatmap_id";
    osu_db_parse_setting[osu_db_parse_setting["beatmapset_id"] = 26] = "beatmapset_id";
    osu_db_parse_setting[osu_db_parse_setting["thread_id"] = 27] = "thread_id";
    osu_db_parse_setting[osu_db_parse_setting["grade_achieved_std"] = 28] = "grade_achieved_std";
    osu_db_parse_setting[osu_db_parse_setting["grade_achieved_taiko"] = 29] = "grade_achieved_taiko";
    osu_db_parse_setting[osu_db_parse_setting["grade_achieved_ctb"] = 30] = "grade_achieved_ctb";
    osu_db_parse_setting[osu_db_parse_setting["grade_achieved_mania"] = 31] = "grade_achieved_mania";
    osu_db_parse_setting[osu_db_parse_setting["local_offset"] = 32] = "local_offset";
    osu_db_parse_setting[osu_db_parse_setting["stack_laniecy"] = 33] = "stack_laniecy";
    osu_db_parse_setting[osu_db_parse_setting["gamemode"] = 34] = "gamemode";
    osu_db_parse_setting[osu_db_parse_setting["source"] = 35] = "source";
    osu_db_parse_setting[osu_db_parse_setting["tags"] = 36] = "tags";
    osu_db_parse_setting[osu_db_parse_setting["online_offset"] = 37] = "online_offset";
    osu_db_parse_setting[osu_db_parse_setting["font_title"] = 38] = "font_title";
    osu_db_parse_setting[osu_db_parse_setting["is_unplayed"] = 39] = "is_unplayed";
    osu_db_parse_setting[osu_db_parse_setting["last_played"] = 40] = "last_played";
    osu_db_parse_setting[osu_db_parse_setting["is_OSZ2"] = 41] = "is_OSZ2";
    osu_db_parse_setting[osu_db_parse_setting["folder_name"] = 42] = "folder_name";
    osu_db_parse_setting[osu_db_parse_setting["last_checked_repository_time"] = 43] = "last_checked_repository_time";
    osu_db_parse_setting[osu_db_parse_setting["is_ignore_hit_sounds"] = 44] = "is_ignore_hit_sounds";
    osu_db_parse_setting[osu_db_parse_setting["is_ignore_skin"] = 45] = "is_ignore_skin";
    osu_db_parse_setting[osu_db_parse_setting["is_disable_storyboard"] = 46] = "is_disable_storyboard";
    osu_db_parse_setting[osu_db_parse_setting["is_disable_video"] = 47] = "is_disable_video";
    osu_db_parse_setting[osu_db_parse_setting["is_visual_override"] = 48] = "is_visual_override";
    osu_db_parse_setting[osu_db_parse_setting["mod_time"] = 49] = "mod_time";
    osu_db_parse_setting[osu_db_parse_setting["mania_scroll"] = 50] = "mania_scroll";
})(osu_db_parse_setting = exports.osu_db_parse_setting || (exports.osu_db_parse_setting = {}));
exports.osu_db_all_parse_settings = [
    osu_db_parse_setting.beatmap_size,
    osu_db_parse_setting.artist,
    osu_db_parse_setting.artist_unicode,
    osu_db_parse_setting.title,
    osu_db_parse_setting.title_unicode,
    osu_db_parse_setting.creator,
    osu_db_parse_setting.difficulty,
    osu_db_parse_setting.audio_filename,
    osu_db_parse_setting.beatmap_md5,
    osu_db_parse_setting.osu_filename,
    osu_db_parse_setting.ranked_status,
    osu_db_parse_setting.number_hitcircles,
    osu_db_parse_setting.number_sliders,
    osu_db_parse_setting.number_spinners,
    osu_db_parse_setting.mod_date,
    osu_db_parse_setting.beatmap_stats,
    osu_db_parse_setting.slider_velocity,
    osu_db_parse_setting.star_rating_std,
    osu_db_parse_setting.star_rating_taiko,
    osu_db_parse_setting.star_rating_ctb,
    osu_db_parse_setting.star_rating_mania,
    osu_db_parse_setting.drain_time,
    osu_db_parse_setting.total_time,
    osu_db_parse_setting.preview_time,
    osu_db_parse_setting.timing_points,
    osu_db_parse_setting.beatmap_id,
    osu_db_parse_setting.beatmapset_id,
    osu_db_parse_setting.thread_id,
    osu_db_parse_setting.grade_achieved_std,
    osu_db_parse_setting.grade_achieved_taiko,
    osu_db_parse_setting.grade_achieved_ctb,
    osu_db_parse_setting.grade_achieved_mania,
    osu_db_parse_setting.local_offset,
    osu_db_parse_setting.stack_laniecy,
    osu_db_parse_setting.gamemode,
    osu_db_parse_setting.source,
    osu_db_parse_setting.tags,
    osu_db_parse_setting.online_offset,
    osu_db_parse_setting.font_title,
    osu_db_parse_setting.is_unplayed,
    osu_db_parse_setting.last_played,
    osu_db_parse_setting.is_OSZ2,
    osu_db_parse_setting.folder_name,
    osu_db_parse_setting.last_checked_repository_time,
    osu_db_parse_setting.is_ignore_hit_sounds,
    osu_db_parse_setting.is_ignore_skin,
    osu_db_parse_setting.is_disable_storyboard,
    osu_db_parse_setting.is_disable_video,
    osu_db_parse_setting.is_visual_override,
    osu_db_parse_setting.mod_time,
    osu_db_parse_setting.mania_scroll
];
exports.osu_db_none_parse_settings = [];
