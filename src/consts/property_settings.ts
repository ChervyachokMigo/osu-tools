export enum beatmap_property {
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
    last_checked_repository_time ,
    is_ignore_hit_sounds,
    is_ignore_skin,
    is_disable_storyboard,
    is_disable_video,
    is_visual_override,
    mod_time,
    mania_scroll
}

export const all_beatmap_properties = [
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
    beatmap_property.mod_time,
    beatmap_property.mania_scroll
]; 

export const none_beatmap_properties: beatmap_property[] = [];

export enum score_property {
    gamemode,
    score_version,
    beatmap_md5,
    playername,
    replay_md5,
    count_300,
    count_100,
    count_50,
    count_geki,
    count_katu,
    count_miss ,
    scores,
    combo,
    is_fc,
    mods,
    /**
     * Notice: in **scores.db** hp_bar always empty
     */
    hp_bar,
    date,
    /**
     * Notice: in **scores.db** replay_data always empty
     */
    replay_data,
    online_id,
    target_practice_accuracy
}

export const all_score_properties = [
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

export const none_score_properties = [];

export enum osu_file_beatmap_property {

    //activate all gerenal properties
    general_block,

    general_beatmap_filename,
    general_audio_filename,
    general_audio_lead_in,
    general_audio_hash,
    general_preview_time,
    general_countdown,
    general_sample_set,
    general_stack_leniency,
    general_gamemode,
    general_is_letterbox_in_break,
    general_is_storyfire_in_front,
    general_is_use_skin_sprites,
    general_is_always_show_playfield,
    general_overlay_position,
    general_skin_preference,
    general_is_epilepsy_warning,
    general_countdown_offset,
    general_is_special_style,
    general_is_widescreen_storyboard,
    general_is_samples_match_playback_rate,

    editor_block,

    editor_bookmarks,
    editor_distance_snapping,
    editor_beat_divisor,
    editor_grid_size,
    editor_timeline_zoom,

    metadata_block,

    metadata_title,
    metadata_title_unicode,
    metadata_artist,
    metadata_artist_unicode,
    metadata_creator,
    metadata_version,
    metadata_source,
    metadata_tags,
    metadata_beatmap_id,
    metadata_beatmapset_id,
    metadata_beatmap_md5,

    difficulty_block,

    difficulty_Health_Points_drain_rate,
    difficulty_Circle_Size,
    difficulty_Overall_Difficulty,
    difficulty_Approach_Rate,
    difficulty_slider_multiplier,
    difficulty_slider_tick_rate,

    events_block,

    events_backgrounds,
    events_videos,
    events_break_points,
    events_color_transformations,
    events_sprites,
    events_samples,
    events_animations,
    events_comments,
    events_scripts,

    timing_points_block,

    colors_block,

    hit_objects_block,
    hit_objects,
    hit_objects_count
}

export const all_general_properties = [
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

export const all_editor_properties = [
    osu_file_beatmap_property.editor_bookmarks,
    osu_file_beatmap_property.editor_distance_snapping,
    osu_file_beatmap_property.editor_beat_divisor,
    osu_file_beatmap_property.editor_grid_size,
    osu_file_beatmap_property.editor_timeline_zoom
];

export const all_metadata_properties = [
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

export const all_difficulty_properties = [
    osu_file_beatmap_property.difficulty_Health_Points_drain_rate,
    osu_file_beatmap_property.difficulty_Circle_Size,
    osu_file_beatmap_property.difficulty_Overall_Difficulty,
    osu_file_beatmap_property.difficulty_Approach_Rate,
    osu_file_beatmap_property.difficulty_slider_multiplier,
    osu_file_beatmap_property.difficulty_slider_tick_rate,
];

export const all_events_properties = [
    osu_file_beatmap_property.events_backgrounds,
    osu_file_beatmap_property.events_videos,
    osu_file_beatmap_property.events_break_points,
    osu_file_beatmap_property.events_color_transformations,
    osu_file_beatmap_property.events_sprites,
    osu_file_beatmap_property.events_samples,
    osu_file_beatmap_property.events_animations,
    osu_file_beatmap_property.events_comments,
    osu_file_beatmap_property.events_scripts
];

export const all_hit_objects_properties = [
    osu_file_beatmap_property.hit_objects,
    osu_file_beatmap_property.hit_objects_count
];

export const all_osu_file_properties = [
    osu_file_beatmap_property.general_block,
    osu_file_beatmap_property.editor_block,
    osu_file_beatmap_property.metadata_block,
    osu_file_beatmap_property.difficulty_block,
    osu_file_beatmap_property.events_block,
    osu_file_beatmap_property.timing_points_block,
    osu_file_beatmap_property.colors_block,
    osu_file_beatmap_property.hit_objects_block,
];

export const none_osu_file_properties: osu_file_beatmap_property[] = [];