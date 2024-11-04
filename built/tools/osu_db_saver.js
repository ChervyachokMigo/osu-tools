"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_save = void 0;
const fs_1 = require("fs");
const buffer_saver_1 = require("./buffer_saver");
const display_progress_1 = require("./display_progress");
const osu_db_save = (osu_db, file_path = 'osu!.db', options = { print_progress: true, print_progress_time: false }) => {
    console.log('start saving osu!.db');
    let buffer = new buffer_saver_1.buffer_saver();
    buffer.addInt(osu_db.osu_version);
    buffer.addInt(osu_db.folder_count);
    buffer.addBool(osu_db.is_account_unlocked);
    buffer.addWindowTickrateFromDate(osu_db.account_unlocked_date);
    buffer.addBufferString(osu_db.playername);
    if (osu_db.number_beatmaps !== osu_db.beatmaps.length) {
        osu_db.number_beatmaps = osu_db.beatmaps.length;
        console.error('osu_db.number_beatmaps is not equals osu_db.beatmaps.length');
    }
    //display variables
    const one_percent_value = Math.trunc(osu_db.number_beatmaps / 100);
    (0, display_progress_1.display_progress_reset)();
    buffer.addInt(osu_db.number_beatmaps);
    for (let i = 0; i < osu_db.number_beatmaps; i++) {
        if (options.print_progress && i % one_percent_value == 0) {
            (0, display_progress_1.display_progress)({
                counter: i,
                one_percent: one_percent_value,
                length: osu_db.number_beatmaps,
                is_print_progress: options.print_progress,
                is_display_time: options.print_progress_time
            });
        }
        const beatmap = osu_db.beatmaps[i];
        if (osu_db.osu_version < 20191106) {
            buffer.addInt(beatmap.beatmap_size);
        }
        buffer.addString(beatmap.artist);
        buffer.addBufferString(beatmap.artist_unicode);
        buffer.addString(beatmap.title);
        buffer.addBufferString(beatmap.title_unicode);
        buffer.addString(beatmap.creator);
        buffer.addString(beatmap.difficulty);
        buffer.addString(beatmap.audio_filename);
        buffer.addString(beatmap.beatmap_md5);
        buffer.addString(beatmap.osu_filename);
        buffer.addByte(beatmap.ranked_status_int);
        buffer.addShort(beatmap.number_hitcircles);
        buffer.addShort(beatmap.number_sliders);
        buffer.addShort(beatmap.number_spinners);
        buffer.addWindowTickrateFromDate(beatmap.mod_date);
        if (osu_db.osu_version < 20140609) {
            buffer.addByte(beatmap.AR);
            buffer.addByte(beatmap.CS);
            buffer.addByte(beatmap.HP);
            buffer.addByte(beatmap.OD);
        }
        else {
            buffer.addSingle(beatmap.AR);
            buffer.addSingle(beatmap.CS);
            buffer.addSingle(beatmap.HP);
            buffer.addSingle(beatmap.OD);
        }
        buffer.addDouble(beatmap.slider_velocity);
        if (osu_db.osu_version >= 20140609) {
            buffer.addStarRatings(beatmap.star_rating_std);
            buffer.addStarRatings(beatmap.star_rating_taiko);
            buffer.addStarRatings(beatmap.star_rating_ctb);
            buffer.addStarRatings(beatmap.star_rating_mania);
        }
        buffer.addInt(beatmap.drain_time);
        buffer.addInt(beatmap.total_time);
        buffer.addInt(beatmap.preview_time);
        buffer.addTimingPoints(beatmap.timing_points);
        buffer.addInt(beatmap.beatmap_id);
        buffer.addInt(beatmap.beatmapset_id);
        buffer.addInt(beatmap.thread_id);
        buffer.addByte(beatmap.grade_achieved_std);
        buffer.addByte(beatmap.grade_achieved_taiko);
        buffer.addByte(beatmap.grade_achieved_ctb);
        buffer.addByte(beatmap.grade_achieved_mania);
        buffer.addShort(beatmap.local_offset);
        buffer.addSingle(beatmap.stack_laniecy);
        buffer.addByte(beatmap.gamemode_int);
        buffer.addString(beatmap.source);
        buffer.addString(beatmap.tags);
        buffer.addShort(beatmap.online_offset);
        buffer.addString(beatmap.font_title);
        buffer.addBool(beatmap.is_unplayed);
        buffer.addWindowTickrateFromDate(beatmap.last_played);
        buffer.addBool(beatmap.is_OSZ2);
        buffer.addString(beatmap.folder_name);
        buffer.addWindowTickrateFromDate(beatmap.last_checked_repository_time);
        buffer.addBool(beatmap.is_ignore_hit_sounds);
        buffer.addBool(beatmap.is_ignore_skin);
        buffer.addBool(beatmap.is_disable_storyboard);
        buffer.addBool(beatmap.is_disable_video);
        buffer.addBool(beatmap.is_visual_override);
        if (osu_db.osu_version < 20140609) {
            buffer.addShort(beatmap.unknown_value);
        }
        buffer.addInt(beatmap.mod_time);
        buffer.addByte(beatmap.mania_scroll);
    }
    buffer.addInt(osu_db.user_permissions_int);
    (0, fs_1.writeFileSync)(file_path, buffer.getBuffer(), { encoding: 'binary' });
    console.log('');
    console.log('end saving osu!.db');
};
exports.osu_db_save = osu_db_save;
