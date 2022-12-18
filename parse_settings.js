"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_none_parse_settings = exports.all_beatmap_properties = exports.beatmap_property_name = void 0;
var beatmap_property_name;
(function (beatmap_property_name) {
    beatmap_property_name["beatmap_size"] = "beatmap_size";
    beatmap_property_name["artist"] = "artist";
    beatmap_property_name["artist_unicode"] = "artist_unicode";
    beatmap_property_name["title"] = "title";
    beatmap_property_name["title_unicode"] = "title_unicode";
    beatmap_property_name["creator"] = "creator";
    beatmap_property_name["difficulty"] = "difficulty";
    beatmap_property_name["audio_filename"] = "audio_filename";
    beatmap_property_name["beatmap_md5"] = "beatmap_md5";
    beatmap_property_name["osu_filename"] = "osu_filename";
    beatmap_property_name["ranked_status"] = "ranked_status";
    beatmap_property_name["number_hitcircles"] = "number_hitcircles";
    beatmap_property_name["number_sliders"] = "number_sliders";
    beatmap_property_name["number_spinners"] = "number_spinners";
    beatmap_property_name["mod_date"] = "mod_date";
    beatmap_property_name["beatmap_stats"] = "beatmap_stats";
    beatmap_property_name["slider_velocity"] = "slider_velocity";
    beatmap_property_name["star_rating_std"] = "star_rating_std";
    beatmap_property_name["star_rating_taiko"] = "star_rating_taiko";
    beatmap_property_name["star_rating_ctb"] = "star_rating_ctb";
    beatmap_property_name["star_rating_mania"] = "star_rating_mania";
    beatmap_property_name["drain_time"] = "drain_time";
    beatmap_property_name["total_time"] = "total_time";
    beatmap_property_name["preview_time"] = "preview_time";
    beatmap_property_name["timing_points"] = "timing_points";
    beatmap_property_name["beatmap_id"] = "beatmap_id";
    beatmap_property_name["beatmapset_id"] = "beatmapset_id";
    beatmap_property_name["thread_id"] = "thread_id";
    beatmap_property_name["grade_achieved_std"] = "grade_achieved_std";
    beatmap_property_name["grade_achieved_taiko"] = "grade_achieved_taiko";
    beatmap_property_name["grade_achieved_ctb"] = "grade_achieved_ctb";
    beatmap_property_name["grade_achieved_mania"] = "grade_achieved_mania";
    beatmap_property_name["local_offset"] = "local_offset";
    beatmap_property_name["stack_laniecy"] = "stack_laniecy";
    beatmap_property_name["gamemode"] = "gamemode";
    beatmap_property_name["source"] = "source";
    beatmap_property_name["tags"] = "tags";
    beatmap_property_name["online_offset"] = "online_offset";
    beatmap_property_name["font_title"] = "font_title";
    beatmap_property_name["is_unplayed"] = "is_unplayed";
    beatmap_property_name["last_played"] = "last_played";
    beatmap_property_name["is_OSZ2"] = "is_OSZ2";
    beatmap_property_name["folder_name"] = "folder_name";
    beatmap_property_name["last_checked_repository_time"] = "last_checked_repository_time";
    beatmap_property_name["is_ignore_hit_sounds"] = "is_ignore_hit_sounds";
    beatmap_property_name["is_ignore_skin"] = "is_ignore_skin";
    beatmap_property_name["is_disable_storyboard"] = "is_disable_storyboard";
    beatmap_property_name["is_disable_video"] = "is_disable_video";
    beatmap_property_name["is_visual_override"] = "is_visual_override";
    beatmap_property_name["mod_time"] = "mod_time";
    beatmap_property_name["mania_scroll"] = "mania_scroll";
})(beatmap_property_name = exports.beatmap_property_name || (exports.beatmap_property_name = {}));
exports.all_beatmap_properties = [
    beatmap_property_name.beatmap_size,
    beatmap_property_name.artist,
    beatmap_property_name.artist_unicode,
    beatmap_property_name.title,
    beatmap_property_name.title_unicode,
    beatmap_property_name.creator,
    beatmap_property_name.difficulty,
    beatmap_property_name.audio_filename,
    beatmap_property_name.beatmap_md5,
    beatmap_property_name.osu_filename,
    beatmap_property_name.ranked_status,
    beatmap_property_name.number_hitcircles,
    beatmap_property_name.number_sliders,
    beatmap_property_name.number_spinners,
    beatmap_property_name.mod_date,
    beatmap_property_name.beatmap_stats,
    beatmap_property_name.slider_velocity,
    beatmap_property_name.star_rating_std,
    beatmap_property_name.star_rating_taiko,
    beatmap_property_name.star_rating_ctb,
    beatmap_property_name.star_rating_mania,
    beatmap_property_name.drain_time,
    beatmap_property_name.total_time,
    beatmap_property_name.preview_time,
    beatmap_property_name.timing_points,
    beatmap_property_name.beatmap_id,
    beatmap_property_name.beatmapset_id,
    beatmap_property_name.thread_id,
    beatmap_property_name.grade_achieved_std,
    beatmap_property_name.grade_achieved_taiko,
    beatmap_property_name.grade_achieved_ctb,
    beatmap_property_name.grade_achieved_mania,
    beatmap_property_name.local_offset,
    beatmap_property_name.stack_laniecy,
    beatmap_property_name.gamemode,
    beatmap_property_name.source,
    beatmap_property_name.tags,
    beatmap_property_name.online_offset,
    beatmap_property_name.font_title,
    beatmap_property_name.is_unplayed,
    beatmap_property_name.last_played,
    beatmap_property_name.is_OSZ2,
    beatmap_property_name.folder_name,
    beatmap_property_name.last_checked_repository_time,
    beatmap_property_name.is_ignore_hit_sounds,
    beatmap_property_name.is_ignore_skin,
    beatmap_property_name.is_disable_storyboard,
    beatmap_property_name.is_disable_video,
    beatmap_property_name.is_visual_override,
    beatmap_property_name.mod_time,
    beatmap_property_name.mania_scroll
];
exports.osu_db_none_parse_settings = [];
/* backup
export enum beatmap_property_name {
    beatmap_size,
    artist,
    artist_unicode,
    title,
    title_unicode,
    creator,
    difficulty,
    audio_filename,
    beatmap_md5,
    osu_filename,
    ranked_status,
    number_hitcircles,
    number_sliders,
    number_spinners,
    mod_date,
    beatmap_stats,
    slider_velocity,
    star_rating_std,
    star_rating_taiko,
    star_rating_ctb,
    star_rating_mania,
    drain_time,
    total_time,
    preview_time,
    timing_points,
    beatmap_id,
    beatmapset_id,
    thread_id,
    grade_achieved_std,
    grade_achieved_taiko,
    grade_achieved_ctb,
    grade_achieved_mania,
    local_offset,
    stack_laniecy,
    gamemode,
    source,
    tags,
    online_offset,
    font_title,
    is_unplayed,
    last_played,
    is_OSZ2,
    folder_name,
    last_checked_repository_time,
    is_ignore_hit_sounds,
    is_ignore_skin,
    is_disable_storyboard,
    is_disable_video,
    is_visual_override,
    mod_time,
    mania_scroll
}
*/ 
