import { beatmap_property } from '../consts/property_settings';

export function property_settings_boolean_array(property_settings: beatmap_property[]) {
    let property_settings_fast: boolean[] = [];

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.beatmap_size) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.artist) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.artist_unicode) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.title) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.title_unicode) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.creator) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.difficulty) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.audio_filename) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.beatmap_md5) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.osu_filename) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.ranked_status) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.number_hitcircles) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.number_sliders) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.number_spinners) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.mod_date) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.beatmap_stats) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.slider_velocity) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.star_rating_std) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.star_rating_taiko) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.star_rating_ctb) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.star_rating_mania) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.drain_time) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.total_time) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.preview_time) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.timing_points) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.beatmap_id) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.beatmapset_id) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.thread_id) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.grade_achieved_std) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.grade_achieved_taiko) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.grade_achieved_ctb) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.grade_achieved_mania) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.local_offset) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.stack_laniecy) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.gamemode) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.source) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.tags) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.online_offset) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.font_title) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_unplayed) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.last_played) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_OSZ2) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.folder_name) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.last_checked_repository_time) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_ignore_hit_sounds) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_ignore_skin) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_disable_storyboard) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_disable_video) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.is_visual_override) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.mod_time) !== -1
    );

    property_settings_fast.push(
        property_settings.indexOf(beatmap_property.mania_scroll) !== -1
    );


    return property_settings_fast;
}
