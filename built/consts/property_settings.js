"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.none_osu_file_properties = exports.break_time_properties = exports.all_osu_file_properties = exports.all_hit_objects_properties = exports.all_timing_points_properties = exports.all_events_properties = exports.all_difficulty_properties = exports.all_metadata_properties = exports.all_editor_properties = exports.all_general_properties = exports.osu_file_beatmap_property = exports.none_score_properties = exports.all_score_properties = exports.score_property = exports.none_beatmap_properties = exports.all_beatmap_properties = exports.beatmap_property = void 0;
var beatmap_property;
(function (beatmap_property) {
    beatmap_property[beatmap_property["beatmap_size"] = 0] = "beatmap_size";
    beatmap_property[beatmap_property["artist"] = 1] = "artist";
    beatmap_property[beatmap_property["artist_unicode"] = 2] = "artist_unicode";
    beatmap_property[beatmap_property["title"] = 3] = "title";
    beatmap_property[beatmap_property["title_unicode"] = 4] = "title_unicode";
    beatmap_property[beatmap_property["creator"] = 5] = "creator";
    beatmap_property[beatmap_property["difficulty"] = 6] = "difficulty";
    beatmap_property[beatmap_property["audio_filename"] = 7] = "audio_filename";
    beatmap_property[beatmap_property["beatmap_md5"] = 8] = "beatmap_md5";
    beatmap_property[beatmap_property["osu_filename"] = 9] = "osu_filename";
    beatmap_property[beatmap_property["ranked_status"] = 10] = "ranked_status";
    beatmap_property[beatmap_property["number_hitcircles"] = 11] = "number_hitcircles";
    beatmap_property[beatmap_property["number_sliders"] = 12] = "number_sliders";
    beatmap_property[beatmap_property["number_spinners"] = 13] = "number_spinners";
    beatmap_property[beatmap_property["mod_date"] = 14] = "mod_date";
    beatmap_property[beatmap_property["beatmap_stats"] = 15] = "beatmap_stats";
    beatmap_property[beatmap_property["slider_velocity"] = 16] = "slider_velocity";
    beatmap_property[beatmap_property["star_rating_std"] = 17] = "star_rating_std";
    beatmap_property[beatmap_property["star_rating_taiko"] = 18] = "star_rating_taiko";
    beatmap_property[beatmap_property["star_rating_ctb"] = 19] = "star_rating_ctb";
    beatmap_property[beatmap_property["star_rating_mania"] = 20] = "star_rating_mania";
    beatmap_property[beatmap_property["drain_time"] = 21] = "drain_time";
    beatmap_property[beatmap_property["total_time"] = 22] = "total_time";
    beatmap_property[beatmap_property["preview_time"] = 23] = "preview_time";
    beatmap_property[beatmap_property["timing_points"] = 24] = "timing_points";
    /**
     * beats per minute: need total_time and timing_points for calculate
     * */
    beatmap_property[beatmap_property["bpm"] = 25] = "bpm";
    beatmap_property[beatmap_property["beatmap_id"] = 26] = "beatmap_id";
    beatmap_property[beatmap_property["beatmapset_id"] = 27] = "beatmapset_id";
    beatmap_property[beatmap_property["thread_id"] = 28] = "thread_id";
    beatmap_property[beatmap_property["grade_achieved_std"] = 29] = "grade_achieved_std";
    beatmap_property[beatmap_property["grade_achieved_taiko"] = 30] = "grade_achieved_taiko";
    beatmap_property[beatmap_property["grade_achieved_ctb"] = 31] = "grade_achieved_ctb";
    beatmap_property[beatmap_property["grade_achieved_mania"] = 32] = "grade_achieved_mania";
    beatmap_property[beatmap_property["local_offset"] = 33] = "local_offset";
    beatmap_property[beatmap_property["stack_laniecy"] = 34] = "stack_laniecy";
    beatmap_property[beatmap_property["gamemode"] = 35] = "gamemode";
    beatmap_property[beatmap_property["source"] = 36] = "source";
    beatmap_property[beatmap_property["tags"] = 37] = "tags";
    beatmap_property[beatmap_property["online_offset"] = 38] = "online_offset";
    beatmap_property[beatmap_property["font_title"] = 39] = "font_title";
    beatmap_property[beatmap_property["is_unplayed"] = 40] = "is_unplayed";
    beatmap_property[beatmap_property["last_played"] = 41] = "last_played";
    beatmap_property[beatmap_property["is_OSZ2"] = 42] = "is_OSZ2";
    beatmap_property[beatmap_property["folder_name"] = 43] = "folder_name";
    beatmap_property[beatmap_property["last_checked_repository_time"] = 44] = "last_checked_repository_time";
    beatmap_property[beatmap_property["is_ignore_hit_sounds"] = 45] = "is_ignore_hit_sounds";
    beatmap_property[beatmap_property["is_ignore_skin"] = 46] = "is_ignore_skin";
    beatmap_property[beatmap_property["is_disable_storyboard"] = 47] = "is_disable_storyboard";
    beatmap_property[beatmap_property["is_disable_video"] = 48] = "is_disable_video";
    beatmap_property[beatmap_property["is_visual_override"] = 49] = "is_visual_override";
    beatmap_property[beatmap_property["unknown_value"] = 50] = "unknown_value";
    beatmap_property[beatmap_property["mod_time"] = 51] = "mod_time";
    beatmap_property[beatmap_property["mania_scroll"] = 52] = "mania_scroll";
})(beatmap_property = exports.beatmap_property || (exports.beatmap_property = {}));
exports.all_beatmap_properties = [
    beatmap_property.beatmap_size,
    beatmap_property.artist,
    beatmap_property.artist_unicode,
    beatmap_property.title,
    beatmap_property.title_unicode,
    beatmap_property.creator,
    beatmap_property.difficulty,
    beatmap_property.audio_filename,
    beatmap_property.beatmap_md5,
    beatmap_property.osu_filename,
    beatmap_property.ranked_status,
    beatmap_property.number_hitcircles,
    beatmap_property.number_sliders,
    beatmap_property.number_spinners,
    beatmap_property.mod_date,
    beatmap_property.beatmap_stats,
    beatmap_property.slider_velocity,
    beatmap_property.star_rating_std,
    beatmap_property.star_rating_taiko,
    beatmap_property.star_rating_ctb,
    beatmap_property.star_rating_mania,
    beatmap_property.drain_time,
    beatmap_property.total_time,
    beatmap_property.preview_time,
    beatmap_property.timing_points,
    beatmap_property.bpm,
    beatmap_property.beatmap_id,
    beatmap_property.beatmapset_id,
    beatmap_property.thread_id,
    beatmap_property.grade_achieved_std,
    beatmap_property.grade_achieved_taiko,
    beatmap_property.grade_achieved_ctb,
    beatmap_property.grade_achieved_mania,
    beatmap_property.local_offset,
    beatmap_property.stack_laniecy,
    beatmap_property.gamemode,
    beatmap_property.source,
    beatmap_property.tags,
    beatmap_property.online_offset,
    beatmap_property.font_title,
    beatmap_property.is_unplayed,
    beatmap_property.last_played,
    beatmap_property.is_OSZ2,
    beatmap_property.folder_name,
    beatmap_property.last_checked_repository_time,
    beatmap_property.is_ignore_hit_sounds,
    beatmap_property.is_ignore_skin,
    beatmap_property.is_disable_storyboard,
    beatmap_property.is_disable_video,
    beatmap_property.is_visual_override,
    beatmap_property.unknown_value,
    beatmap_property.mod_time,
    beatmap_property.mania_scroll
];
exports.none_beatmap_properties = [];
var score_property;
(function (score_property) {
    score_property[score_property["gamemode"] = 0] = "gamemode";
    score_property[score_property["score_version"] = 1] = "score_version";
    score_property[score_property["beatmap_md5"] = 2] = "beatmap_md5";
    score_property[score_property["playername"] = 3] = "playername";
    score_property[score_property["replay_md5"] = 4] = "replay_md5";
    score_property[score_property["count_300"] = 5] = "count_300";
    score_property[score_property["count_100"] = 6] = "count_100";
    score_property[score_property["count_50"] = 7] = "count_50";
    score_property[score_property["count_geki"] = 8] = "count_geki";
    score_property[score_property["count_katu"] = 9] = "count_katu";
    score_property[score_property["count_miss"] = 10] = "count_miss";
    score_property[score_property["scores"] = 11] = "scores";
    score_property[score_property["combo"] = 12] = "combo";
    score_property[score_property["is_fc"] = 13] = "is_fc";
    score_property[score_property["mods"] = 14] = "mods";
    /**
     * Notice: in **scores.db** hp_bar always empty
     */
    score_property[score_property["hp_bar"] = 15] = "hp_bar";
    score_property[score_property["date"] = 16] = "date";
    /**
     * Notice: in **scores.db** replay_data always empty
     */
    score_property[score_property["replay_data"] = 17] = "replay_data";
    score_property[score_property["online_id"] = 18] = "online_id";
    score_property[score_property["target_practice_accuracy"] = 19] = "target_practice_accuracy";
})(score_property = exports.score_property || (exports.score_property = {}));
exports.all_score_properties = [
    score_property.gamemode,
    score_property.score_version,
    score_property.beatmap_md5,
    score_property.playername,
    score_property.replay_md5,
    score_property.count_300,
    score_property.count_100,
    score_property.count_50,
    score_property.count_geki,
    score_property.count_katu,
    score_property.count_miss,
    score_property.scores,
    score_property.combo,
    score_property.is_fc,
    score_property.mods,
    score_property.hp_bar,
    score_property.date,
    score_property.replay_data,
    score_property.online_id,
    score_property.target_practice_accuracy
];
exports.none_score_properties = [];
var osu_file_beatmap_property;
(function (osu_file_beatmap_property) {
    //activate all gerenal properties
    osu_file_beatmap_property[osu_file_beatmap_property["general_block"] = 0] = "general_block";
    osu_file_beatmap_property[osu_file_beatmap_property["general_beatmap_filename"] = 1] = "general_beatmap_filename";
    osu_file_beatmap_property[osu_file_beatmap_property["general_audio_filename"] = 2] = "general_audio_filename";
    osu_file_beatmap_property[osu_file_beatmap_property["general_audio_lead_in"] = 3] = "general_audio_lead_in";
    osu_file_beatmap_property[osu_file_beatmap_property["general_audio_hash"] = 4] = "general_audio_hash";
    osu_file_beatmap_property[osu_file_beatmap_property["general_preview_time"] = 5] = "general_preview_time";
    osu_file_beatmap_property[osu_file_beatmap_property["general_countdown"] = 6] = "general_countdown";
    osu_file_beatmap_property[osu_file_beatmap_property["general_sample_set"] = 7] = "general_sample_set";
    osu_file_beatmap_property[osu_file_beatmap_property["general_stack_leniency"] = 8] = "general_stack_leniency";
    osu_file_beatmap_property[osu_file_beatmap_property["general_gamemode"] = 9] = "general_gamemode";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_letterbox_in_break"] = 10] = "general_is_letterbox_in_break";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_storyfire_in_front"] = 11] = "general_is_storyfire_in_front";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_use_skin_sprites"] = 12] = "general_is_use_skin_sprites";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_always_show_playfield"] = 13] = "general_is_always_show_playfield";
    osu_file_beatmap_property[osu_file_beatmap_property["general_overlay_position"] = 14] = "general_overlay_position";
    osu_file_beatmap_property[osu_file_beatmap_property["general_skin_preference"] = 15] = "general_skin_preference";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_epilepsy_warning"] = 16] = "general_is_epilepsy_warning";
    osu_file_beatmap_property[osu_file_beatmap_property["general_countdown_offset"] = 17] = "general_countdown_offset";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_special_style"] = 18] = "general_is_special_style";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_widescreen_storyboard"] = 19] = "general_is_widescreen_storyboard";
    osu_file_beatmap_property[osu_file_beatmap_property["general_is_samples_match_playback_rate"] = 20] = "general_is_samples_match_playback_rate";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_block"] = 21] = "editor_block";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_bookmarks"] = 22] = "editor_bookmarks";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_distance_snapping"] = 23] = "editor_distance_snapping";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_beat_divisor"] = 24] = "editor_beat_divisor";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_grid_size"] = 25] = "editor_grid_size";
    osu_file_beatmap_property[osu_file_beatmap_property["editor_timeline_zoom"] = 26] = "editor_timeline_zoom";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_block"] = 27] = "metadata_block";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_title"] = 28] = "metadata_title";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_title_unicode"] = 29] = "metadata_title_unicode";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_artist"] = 30] = "metadata_artist";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_artist_unicode"] = 31] = "metadata_artist_unicode";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_creator"] = 32] = "metadata_creator";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_version"] = 33] = "metadata_version";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_source"] = 34] = "metadata_source";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_tags"] = 35] = "metadata_tags";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_beatmap_id"] = 36] = "metadata_beatmap_id";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_beatmapset_id"] = 37] = "metadata_beatmapset_id";
    osu_file_beatmap_property[osu_file_beatmap_property["metadata_beatmap_md5"] = 38] = "metadata_beatmap_md5";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_block"] = 39] = "difficulty_block";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_Health_Points_drain_rate"] = 40] = "difficulty_Health_Points_drain_rate";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_Circle_Size"] = 41] = "difficulty_Circle_Size";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_Overall_Difficulty"] = 42] = "difficulty_Overall_Difficulty";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_Approach_Rate"] = 43] = "difficulty_Approach_Rate";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_slider_multiplier"] = 44] = "difficulty_slider_multiplier";
    osu_file_beatmap_property[osu_file_beatmap_property["difficulty_slider_tick_rate"] = 45] = "difficulty_slider_tick_rate";
    osu_file_beatmap_property[osu_file_beatmap_property["events_block"] = 46] = "events_block";
    osu_file_beatmap_property[osu_file_beatmap_property["events_backgrounds"] = 47] = "events_backgrounds";
    osu_file_beatmap_property[osu_file_beatmap_property["events_videos"] = 48] = "events_videos";
    osu_file_beatmap_property[osu_file_beatmap_property["events_break_points"] = 49] = "events_break_points";
    osu_file_beatmap_property[osu_file_beatmap_property["events_color_transformations"] = 50] = "events_color_transformations";
    osu_file_beatmap_property[osu_file_beatmap_property["events_sprites"] = 51] = "events_sprites";
    osu_file_beatmap_property[osu_file_beatmap_property["events_samples"] = 52] = "events_samples";
    osu_file_beatmap_property[osu_file_beatmap_property["events_animations"] = 53] = "events_animations";
    osu_file_beatmap_property[osu_file_beatmap_property["events_comments"] = 54] = "events_comments";
    osu_file_beatmap_property[osu_file_beatmap_property["events_scripts"] = 55] = "events_scripts";
    osu_file_beatmap_property[osu_file_beatmap_property["timing_points_block"] = 56] = "timing_points_block";
    osu_file_beatmap_property[osu_file_beatmap_property["timing_points"] = 57] = "timing_points";
    osu_file_beatmap_property[osu_file_beatmap_property["colors_block"] = 58] = "colors_block";
    osu_file_beatmap_property[osu_file_beatmap_property["hit_objects_block"] = 59] = "hit_objects_block";
    osu_file_beatmap_property[osu_file_beatmap_property["hit_objects"] = 60] = "hit_objects";
    osu_file_beatmap_property[osu_file_beatmap_property["hit_objects_count"] = 61] = "hit_objects_count";
    osu_file_beatmap_property[osu_file_beatmap_property["circles_count"] = 62] = "circles_count";
    osu_file_beatmap_property[osu_file_beatmap_property["sliders_count"] = 63] = "sliders_count";
    osu_file_beatmap_property[osu_file_beatmap_property["total_time"] = 64] = "total_time";
    osu_file_beatmap_property[osu_file_beatmap_property["drain_time"] = 65] = "drain_time";
    osu_file_beatmap_property[osu_file_beatmap_property["break_time"] = 66] = "break_time";
    osu_file_beatmap_property[osu_file_beatmap_property["circles_time"] = 67] = "circles_time";
    osu_file_beatmap_property[osu_file_beatmap_property["sliders_time"] = 68] = "sliders_time";
    osu_file_beatmap_property[osu_file_beatmap_property["bpm"] = 69] = "bpm";
    osu_file_beatmap_property[osu_file_beatmap_property["stream_difficulty"] = 70] = "stream_difficulty";
})(osu_file_beatmap_property = exports.osu_file_beatmap_property || (exports.osu_file_beatmap_property = {}));
exports.all_general_properties = [
    osu_file_beatmap_property.general_beatmap_filename,
    osu_file_beatmap_property.general_audio_filename,
    osu_file_beatmap_property.general_audio_lead_in,
    osu_file_beatmap_property.general_audio_hash,
    osu_file_beatmap_property.general_preview_time,
    osu_file_beatmap_property.general_countdown,
    osu_file_beatmap_property.general_sample_set,
    osu_file_beatmap_property.general_stack_leniency,
    osu_file_beatmap_property.general_gamemode,
    osu_file_beatmap_property.general_is_letterbox_in_break,
    osu_file_beatmap_property.general_is_storyfire_in_front,
    osu_file_beatmap_property.general_is_use_skin_sprites,
    osu_file_beatmap_property.general_is_always_show_playfield,
    osu_file_beatmap_property.general_overlay_position,
    osu_file_beatmap_property.general_skin_preference,
    osu_file_beatmap_property.general_is_epilepsy_warning,
    osu_file_beatmap_property.general_countdown_offset,
    osu_file_beatmap_property.general_is_special_style,
    osu_file_beatmap_property.general_is_widescreen_storyboard,
    osu_file_beatmap_property.general_is_samples_match_playback_rate
];
exports.all_editor_properties = [
    osu_file_beatmap_property.editor_bookmarks,
    osu_file_beatmap_property.editor_distance_snapping,
    osu_file_beatmap_property.editor_beat_divisor,
    osu_file_beatmap_property.editor_grid_size,
    osu_file_beatmap_property.editor_timeline_zoom
];
exports.all_metadata_properties = [
    osu_file_beatmap_property.metadata_title,
    osu_file_beatmap_property.metadata_title_unicode,
    osu_file_beatmap_property.metadata_artist,
    osu_file_beatmap_property.metadata_artist_unicode,
    osu_file_beatmap_property.metadata_creator,
    osu_file_beatmap_property.metadata_version,
    osu_file_beatmap_property.metadata_source,
    osu_file_beatmap_property.metadata_tags,
    osu_file_beatmap_property.metadata_beatmap_id,
    osu_file_beatmap_property.metadata_beatmapset_id,
    osu_file_beatmap_property.metadata_beatmap_md5
];
exports.all_difficulty_properties = [
    osu_file_beatmap_property.difficulty_Health_Points_drain_rate,
    osu_file_beatmap_property.difficulty_Circle_Size,
    osu_file_beatmap_property.difficulty_Overall_Difficulty,
    osu_file_beatmap_property.difficulty_Approach_Rate,
    osu_file_beatmap_property.difficulty_slider_multiplier,
    osu_file_beatmap_property.difficulty_slider_tick_rate,
];
exports.all_events_properties = [
    osu_file_beatmap_property.events_backgrounds,
    osu_file_beatmap_property.events_videos,
    osu_file_beatmap_property.events_break_points,
    osu_file_beatmap_property.events_color_transformations,
    osu_file_beatmap_property.events_sprites,
    osu_file_beatmap_property.events_samples,
    osu_file_beatmap_property.events_animations,
    osu_file_beatmap_property.events_comments,
    osu_file_beatmap_property.events_scripts,
];
exports.all_timing_points_properties = [
    osu_file_beatmap_property.timing_points,
    osu_file_beatmap_property.break_time,
    osu_file_beatmap_property.total_time,
    osu_file_beatmap_property.drain_time,
    osu_file_beatmap_property.bpm,
    osu_file_beatmap_property.stream_difficulty,
    osu_file_beatmap_property.circles_time,
    osu_file_beatmap_property.sliders_time,
];
exports.all_hit_objects_properties = [
    osu_file_beatmap_property.hit_objects,
    osu_file_beatmap_property.hit_objects_count,
    osu_file_beatmap_property.circles_count,
    osu_file_beatmap_property.sliders_count,
];
exports.all_osu_file_properties = [
    osu_file_beatmap_property.general_block,
    osu_file_beatmap_property.editor_block,
    osu_file_beatmap_property.metadata_block,
    osu_file_beatmap_property.difficulty_block,
    osu_file_beatmap_property.events_block,
    osu_file_beatmap_property.timing_points_block,
    osu_file_beatmap_property.colors_block,
    osu_file_beatmap_property.hit_objects_block,
];
exports.break_time_properties = [
    osu_file_beatmap_property.timing_points_block,
    osu_file_beatmap_property.break_time,
    osu_file_beatmap_property.stream_difficulty
];
exports.none_osu_file_properties = [];
