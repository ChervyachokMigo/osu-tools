export declare enum beatmap_property {
    beatmap_size = 0,
    artist = 1,
    artist_unicode = 2,
    title = 3,
    title_unicode = 4,
    creator = 5,
    difficulty = 6,
    audio_filename = 7,
    beatmap_md5 = 8,
    osu_filename = 9,
    ranked_status = 10,
    number_hitcircles = 11,
    number_sliders = 12,
    number_spinners = 13,
    mod_date = 14,
    beatmap_stats = 15,
    slider_velocity = 16,
    star_rating_std = 17,
    star_rating_taiko = 18,
    star_rating_ctb = 19,
    star_rating_mania = 20,
    drain_time = 21,
    total_time = 22,
    preview_time = 23,
    timing_points = 24,
    /**
     * beats per minute: need total_time and timing_points for calculate
     * */
    bpm = 25,
    beatmap_id = 26,
    beatmapset_id = 27,
    thread_id = 28,
    grade_achieved_std = 29,
    grade_achieved_taiko = 30,
    grade_achieved_ctb = 31,
    grade_achieved_mania = 32,
    local_offset = 33,
    stack_laniecy = 34,
    gamemode = 35,
    source = 36,
    tags = 37,
    online_offset = 38,
    font_title = 39,
    is_unplayed = 40,
    last_played = 41,
    is_OSZ2 = 42,
    folder_name = 43,
    last_checked_repository_time = 44,
    is_ignore_hit_sounds = 45,
    is_ignore_skin = 46,
    is_disable_storyboard = 47,
    is_disable_video = 48,
    is_visual_override = 49,
    unknown_value = 50,
    mod_time = 51,
    mania_scroll = 52
}
export declare const all_beatmap_properties: beatmap_property[];
export declare const none_beatmap_properties: beatmap_property[];
export declare enum score_property {
    gamemode = 0,
    score_version = 1,
    beatmap_md5 = 2,
    playername = 3,
    replay_md5 = 4,
    count_300 = 5,
    count_100 = 6,
    count_50 = 7,
    count_geki = 8,
    count_katu = 9,
    count_miss = 10,
    scores = 11,
    combo = 12,
    is_fc = 13,
    mods = 14,
    /**
     * Notice: in **scores.db** hp_bar always empty
     */
    hp_bar = 15,
    date = 16,
    /**
     * Notice: in **scores.db** replay_data always empty
     */
    replay_data = 17,
    online_id = 18,
    target_practice_accuracy = 19
}
export declare const all_score_properties: score_property[];
export declare const none_score_properties: never[];
export declare enum osu_file_beatmap_property {
    general_block = 0,
    general_beatmap_filename = 1,
    general_audio_filename = 2,
    general_audio_lead_in = 3,
    general_audio_hash = 4,
    general_preview_time = 5,
    general_countdown = 6,
    general_sample_set = 7,
    general_stack_leniency = 8,
    general_gamemode = 9,
    general_is_letterbox_in_break = 10,
    general_is_storyfire_in_front = 11,
    general_is_use_skin_sprites = 12,
    general_is_always_show_playfield = 13,
    general_overlay_position = 14,
    general_skin_preference = 15,
    general_is_epilepsy_warning = 16,
    general_countdown_offset = 17,
    general_is_special_style = 18,
    general_is_widescreen_storyboard = 19,
    general_is_samples_match_playback_rate = 20,
    editor_block = 21,
    editor_bookmarks = 22,
    editor_distance_snapping = 23,
    editor_beat_divisor = 24,
    editor_grid_size = 25,
    editor_timeline_zoom = 26,
    metadata_block = 27,
    metadata_title = 28,
    metadata_title_unicode = 29,
    metadata_artist = 30,
    metadata_artist_unicode = 31,
    metadata_creator = 32,
    metadata_version = 33,
    metadata_source = 34,
    metadata_tags = 35,
    metadata_beatmap_id = 36,
    metadata_beatmapset_id = 37,
    metadata_beatmap_md5 = 38,
    difficulty_block = 39,
    difficulty_Health_Points_drain_rate = 40,
    difficulty_Circle_Size = 41,
    difficulty_Overall_Difficulty = 42,
    difficulty_Approach_Rate = 43,
    difficulty_slider_multiplier = 44,
    difficulty_slider_tick_rate = 45,
    events_block = 46,
    events_backgrounds = 47,
    events_videos = 48,
    events_break_points = 49,
    events_color_transformations = 50,
    events_sprites = 51,
    events_samples = 52,
    events_animations = 53,
    events_comments = 54,
    events_scripts = 55,
    timing_points_block = 56,
    colors_block = 57,
    hit_objects_block = 58,
    hit_objects = 59,
    hit_objects_count = 60
}
export declare const all_general_properties: osu_file_beatmap_property[];
export declare const all_editor_properties: osu_file_beatmap_property[];
export declare const all_metadata_properties: osu_file_beatmap_property[];
export declare const all_difficulty_properties: osu_file_beatmap_property[];
export declare const all_events_properties: osu_file_beatmap_property[];
export declare const all_hit_objects_properties: osu_file_beatmap_property[];
export declare const all_osu_file_properties: osu_file_beatmap_property[];
export declare const none_osu_file_properties: osu_file_beatmap_property[];
//# sourceMappingURL=property_settings.d.ts.map