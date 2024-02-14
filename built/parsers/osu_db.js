"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_find_beatmaps = exports.osu_db_load = exports.osu_db = void 0;
const property_settings_1 = require("../consts/property_settings");
const osu_file_1 = require("./osu_file");
const osu_file_type_1 = require("../consts/osu_file_type");
const variable_types_1 = require("../consts/variable_types");
class osu_db extends osu_file_1.osu_file {
    constructor(file_path, property_settings) {
        super(file_path, property_settings);
        this.property_settings_fast = [];
    }
    osu_db_parse(options = { print_progress: false }) {
        let osu_db = { beatmaps: [] };
        console.log('start parsing osu db..');
        if (this.property_settings.length == 0) {
            console.error('no set parse settings, results will without beatmaps');
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_md5) == -1) {
            console.error('no setted beatmap_md5 parse setting', 'beatmaps will not be unioned with collection_db without it setting');
        }
        osu_db.osu_version = this.buff.getInt();
        osu_db.folder_count = this.buff.getInt();
        osu_db.is_account_unlocked = this.buff.getBool();
        osu_db.account_unlocked_date = this.buff.getDateTime();
        osu_db.playername = this.buff.getString();
        osu_db.number_beatmaps = this.buff.getInt();
        // this.property_settings_fast = property_settings_boolean_array(this.property_settings);
        //display variables
        const one_percent_value = Math.trunc(osu_db.number_beatmaps / 100);
        let start_time = new Date().valueOf();
        let avg_times = [];
        for (let i = 0; i < osu_db.number_beatmaps; i++) {
            //beatmap parsing
            let beatmap_data = this.beatmap_parse(osu_db.osu_version);
            if (Object.keys(beatmap_data).length > 0) {
                osu_db.beatmaps.push(beatmap_data);
            }
            //display progress
            if (options.print_progress && i % one_percent_value == 0) {
                console.log(((i / osu_db.number_beatmaps * 10000) / 100).toFixed(1), '% complete');
                let endtime = (new Date().valueOf() - start_time) * 0.001;
                console.log('end for', endtime.toFixed(3));
                start_time = new Date().valueOf();
                avg_times.push(endtime);
                console.log('avg_time', (avg_times.reduce((a, b) => a + b) / avg_times.length).toFixed(3));
            }
        }
        osu_db.user_permissions_int = this.buff.getInt();
        osu_db.user_permissions = variable_types_1.UserPermissions[osu_db.user_permissions_int];
        console.log('end parsing osu db');
        return osu_db;
    }
    beatmap_parse(osu_db_version) {
        var beatmap = {};
        if (osu_db_version < 20191106) {
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_size) !== -1) {
                beatmap.beatmap_size = this.buff.getInt();
            }
            else {
                this.buff.skipInt();
            }
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.artist) !== -1) {
            beatmap.artist = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.artist_unicode) !== -1) {
            beatmap.artist_unicode = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.title) !== -1) {
            beatmap.title = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.title_unicode) !== -1) {
            beatmap.title_unicode = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.creator) !== -1) {
            beatmap.creator = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.difficulty) !== -1) {
            beatmap.difficulty = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.audio_filename) !== -1) {
            beatmap.audio_filename = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_md5) !== -1) {
            beatmap.beatmap_md5 = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.osu_filename) !== -1) {
            beatmap.osu_filename = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.ranked_status) !== -1) {
            beatmap.ranked_status_int = this.buff.getByte();
            beatmap.ranked_status = variable_types_1.RankedStatus[beatmap.ranked_status_int];
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.number_hitcircles) !== -1) {
            beatmap.number_hitcircles = this.buff.getShort();
        }
        else {
            this.buff.skipShort();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.number_sliders) !== -1) {
            beatmap.number_sliders = this.buff.getShort();
        }
        else {
            this.buff.skipShort();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.number_spinners) !== -1) {
            beatmap.number_spinners = this.buff.getShort();
        }
        else {
            this.buff.skipShort();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.mod_date) !== -1) {
            beatmap.mod_date = this.buff.getDateTime();
        }
        else {
            this.buff.skipDateTime();
        }
        if (osu_db_version < 20140609) {
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_stats) !== -1) {
                beatmap.AR = this.buff.getByte();
                beatmap.CS = this.buff.getByte();
                beatmap.HP = this.buff.getByte();
                beatmap.OD = this.buff.getByte();
            }
            else {
                this.buff.skipBytes(4);
            }
        }
        else {
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_stats) !== -1) {
                beatmap.AR = this.buff.getSingle();
                beatmap.CS = this.buff.getSingle();
                beatmap.HP = this.buff.getSingle();
                beatmap.OD = this.buff.getSingle();
            }
            else {
                this.buff.skipBytes(16);
            }
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.slider_velocity) !== -1) {
            beatmap.slider_velocity = this.buff.getDouble();
        }
        else {
            this.buff.skipDouble();
        }
        if (osu_db_version >= 20140609) {
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.star_rating_std) !== -1) {
                beatmap.star_rating_std = this.buff.getStarRatings();
            }
            else {
                this.buff.skipStarRatings();
            }
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.star_rating_taiko) !== -1) {
                beatmap.star_rating_taiko = this.buff.getStarRatings();
            }
            else {
                this.buff.skipStarRatings();
            }
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.star_rating_ctb) !== -1) {
                beatmap.star_rating_ctb = this.buff.getStarRatings();
            }
            else {
                this.buff.skipStarRatings();
            }
            if (this.property_settings.indexOf(property_settings_1.beatmap_property.star_rating_mania) !== -1) {
                beatmap.star_rating_mania = this.buff.getStarRatings();
            }
            else {
                this.buff.skipStarRatings();
            }
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.drain_time) !== -1) {
            beatmap.drain_time = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.total_time) !== -1) {
            beatmap.total_time = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.preview_time) !== -1) {
            beatmap.preview_time = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.timing_points) !== -1) {
            beatmap.timing_points = this.buff.getTimingPoints();
        }
        else {
            this.buff.skipTimingPoints();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmap_id) !== -1) {
            beatmap.beatmap_id = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.beatmapset_id) !== -1) {
            beatmap.beatmapset_id = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.thread_id) !== -1) {
            beatmap.thread_id = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.grade_achieved_std) !== -1) {
            beatmap.grade_achieved_std = this.buff.getByte();
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.grade_achieved_taiko) !== -1) {
            beatmap.grade_achieved_taiko = this.buff.getByte();
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.grade_achieved_ctb) !== -1) {
            beatmap.grade_achieved_ctb = this.buff.getByte();
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.grade_achieved_mania) !== -1) {
            beatmap.grade_achieved_mania = this.buff.getByte();
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.local_offset) !== -1) {
            beatmap.local_offset = this.buff.getShort();
        }
        else {
            this.buff.skipShort();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.stack_laniecy) !== -1) {
            beatmap.stack_laniecy = this.buff.getSingle();
        }
        else {
            this.buff.skipSingle();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.gamemode) !== -1) {
            beatmap.gamemode_int = this.buff.getByte();
            beatmap.gamemode = variable_types_1.Gamemode[beatmap.gamemode_int];
        }
        else {
            this.buff.skipByte();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.source) !== -1) {
            beatmap.source = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.tags) !== -1) {
            beatmap.tags = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.online_offset) !== -1) {
            beatmap.online_offset = this.buff.getShort();
        }
        else {
            this.buff.skipShort();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.font_title) !== -1) {
            beatmap.font_title = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_unplayed) !== -1) {
            beatmap.is_unplayed = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.last_played) !== -1) {
            beatmap.last_played = this.buff.getDateTime();
        }
        else {
            this.buff.skipDateTime();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_OSZ2) !== -1) {
            beatmap.is_OSZ2 = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.folder_name) !== -1) {
            beatmap.folder_name = this.buff.getString();
        }
        else {
            this.buff.skipString();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.last_checked_repository_time) !== -1) {
            beatmap.last_checked_repository_time = this.buff.getDateTime();
        }
        else {
            this.buff.skipDateTime();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_ignore_hit_sounds) !== -1) {
            beatmap.is_ignore_hit_sounds = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_ignore_skin) !== -1) {
            beatmap.is_ignore_skin = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_disable_storyboard) !== -1) {
            beatmap.is_disable_storyboard = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_disable_video) !== -1) {
            beatmap.is_disable_video = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.is_visual_override) !== -1) {
            beatmap.is_visual_override = this.buff.getBool();
        }
        else {
            this.buff.skipBool();
        }
        if (osu_db_version < 20140609) {
            this.buff.skipShort(); //unknown_value
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.mod_time) !== -1) {
            beatmap.mod_time = this.buff.getInt();
        }
        else {
            this.buff.skipInt();
        }
        if (this.property_settings.indexOf(property_settings_1.beatmap_property.mania_scroll) !== -1) {
            beatmap.mania_scroll = this.buff.getByte();
        }
        else {
            this.buff.skipByte();
        }
        return beatmap;
    }
}
exports.osu_db = osu_db;
/**
 * @returns osu_db_results with all beatmaps information
 * @param osu_db_path - absolute path to osu.db
 * @also use `all_beatmap_properties` for set all beatmap settings
 */
function osu_db_load(osu_db_path, parse_settings, options) {
    var file_parse_result = { beatmaps: [] };
    try {
        let osu_db_file = new osu_db(osu_db_path, parse_settings);
        switch (osu_db_file.get_type()) {
            case osu_file_type_1.osu_file_type.osu_db:
                file_parse_result = osu_db_file.osu_db_parse(options);
                break;
            default:
                throw new Error('file type not osu file');
        }
        osu_db_file.close();
        return file_parse_result;
    }
    catch (e) {
        console.error(e);
        return file_parse_result;
    }
}
exports.osu_db_load = osu_db_load;
/**
 * @param osu_db_result osu_db_results object from load osu.db
 * @param search_function any function for find beatmap, need return boolean
 * @returns `array of beatmaps_results` of search by search function expression
 * @example
 * //returns all beatmaps with id < 100
 * find_beatmaps( osu_db_result, (beatmap) => beatmap.beatmap_id && beatmap.beatmap_id < 100 );
 */
function osu_db_find_beatmaps(osu_db_result, search_function) {
    let beatmaps = osu_db_result.beatmaps.filter(search_function);
    if (typeof beatmaps !== 'undefined') {
        return beatmaps;
    }
    else {
        return [];
    }
}
exports.osu_db_find_beatmaps = osu_db_find_beatmaps;
