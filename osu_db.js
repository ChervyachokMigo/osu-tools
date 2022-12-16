"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.osu_db_parse_setting = exports.osu_file_load = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ticks_to_date_1 = __importDefault(require("ticks-to-date"));
var UserPermissions;
(function (UserPermissions) {
    UserPermissions[UserPermissions["None"] = 0] = "None";
    UserPermissions[UserPermissions["Normal"] = 1] = "Normal";
    UserPermissions[UserPermissions["Moderator"] = 2] = "Moderator";
    UserPermissions[UserPermissions["Supporter"] = 4] = "Supporter";
    UserPermissions[UserPermissions["Friend"] = 8] = "Friend";
    UserPermissions[UserPermissions["peppy"] = 16] = "peppy";
    UserPermissions[UserPermissions["World_Cup_staff"] = 32] = "World_Cup_staff";
})(UserPermissions || (UserPermissions = {}));
var Gamemodes;
(function (Gamemodes) {
    Gamemodes[Gamemodes["std"] = 0] = "std";
    Gamemodes[Gamemodes["taiko"] = 1] = "taiko";
    Gamemodes[Gamemodes["ctb"] = 2] = "ctb";
    Gamemodes[Gamemodes["mania"] = 3] = "mania";
})(Gamemodes || (Gamemodes = {}));
var RankedStatus;
(function (RankedStatus) {
    RankedStatus[RankedStatus["unknown"] = 0] = "unknown";
    RankedStatus[RankedStatus["unsubmitted"] = 1] = "unsubmitted";
    RankedStatus[RankedStatus["pending"] = 2] = "pending";
    RankedStatus[RankedStatus["wip"] = 2] = "wip";
    RankedStatus[RankedStatus["graveyard"] = 2] = "graveyard";
    RankedStatus[RankedStatus["unused"] = 3] = "unused";
    RankedStatus[RankedStatus["ranked"] = 4] = "ranked";
    RankedStatus[RankedStatus["approved"] = 5] = "approved";
    RankedStatus[RankedStatus["qualified"] = 6] = "qualified";
    RankedStatus[RankedStatus["loved"] = 7] = "loved";
})(RankedStatus || (RankedStatus = {}));
function osu_file_load(osu_path, parse_settings) {
    var file_parse_result = false;
    try {
        let osu_db_file = new osu_file(osu_path, parse_settings);
        switch (osu_db_file.get_type()) {
            case osu_file_type.osu_db:
                file_parse_result = osu_db_file.osu_db_parse();
                break;
            default:
                throw new Error('file type not osu file');
        }
        osu_db_file.close();
        return file_parse_result;
    }
    catch (e) {
        console.log(e);
        return file_parse_result;
    }
}
exports.osu_file_load = osu_file_load;
var osu_file_type;
(function (osu_file_type) {
    osu_file_type[osu_file_type["none"] = -1] = "none";
    osu_file_type["osu_db"] = "osu!.db";
    osu_file_type["collection_db"] = "collection.db";
    osu_file_type["scores_db"] = "scores.db";
    osu_file_type["presence_db"] = "presence.db";
})(osu_file_type || (osu_file_type = {}));
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
class osu_file {
    constructor(file_path, parse_settings) {
        this.cursor_offset = 0;
        this.file_type = osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path_1.default.basename(file_path);
        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }
        if (parse_settings && parse_settings.length > 0) {
            this.parse_settings = parse_settings;
        }
        else {
            this.parse_settings = [];
        }
        try {
            this.file_handle = fs_1.default.openSync(`${file_path}`, 'r');
        }
        catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
        return this;
    }
    close() {
        return fs_1.default.closeSync(this.file_handle);
    }
    get_type() {
        return this.file_type;
    }
    set_type() {
        if (path_1.default.extname(this.file_basename) === '.db') {
            if (this.file_basename.startsWith(osu_file_type.osu_db)) {
                this.file_type = osu_file_type.osu_db;
            }
            else {
                switch (this.file_basename) {
                    case osu_file_type.collection_db:
                        this.file_type = osu_file_type.collection_db;
                        break;
                    case osu_file_type.presence_db:
                        this.file_type = osu_file_type.presence_db;
                        break;
                    case osu_file_type.scores_db:
                        this.file_type = osu_file_type.scores_db;
                        break;
                }
            }
            if (this.file_type === osu_file_type.none) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    set_parse_settings(parse_settings) {
        if (parse_settings && parse_settings.length > 0) {
            this.parse_settings = parse_settings;
        }
        else {
            throw new Error('wrong parse settings');
        }
    }
    osu_db_parse() {
        let osu_db = { is_loaded: false };
        if (typeof this.parse_settings === 'undefined' || this.parse_settings.length == 0) {
            throw new Error('set parse settings first');
        }
        osu_db.osu_version = this.getInt();
        osu_db.folder_count = this.getInt();
        osu_db.is_account_unlocked = this.getBool();
        osu_db.account_unlocked_date = this.getDateTime();
        osu_db.playername = this.getString();
        osu_db.number_beatmaps = this.getInt();
        osu_db.beatmaps = [];
        for (let i = 0; i < osu_db.number_beatmaps; i++) {
            let beatmap_data = this.osu_db_beatmap_parse(osu_db.osu_version);
            console.log(i, beatmap_data);
            osu_db.beatmaps.push(beatmap_data);
        }
        //osu_db.user_permissions = this.getInt();
        return osu_db;
    }
    osu_db_beatmap_parse(osu_db_version) {
        var beatmap = {};
        if (osu_db_version < 20191106) {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_size) != -1) {
                beatmap.beatmap_size = this.getInt();
            }
            else {
                this.skipInt();
            }
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.artist) != -1) {
            beatmap.artist = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.artist_unicode) != -1) {
            beatmap.artist_unicode = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title) != -1) {
            beatmap.title = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title_unicode) != -1) {
            beatmap.title_unicode = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.creator) != -1) {
            beatmap.creator = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.difficulty) != -1) {
            beatmap.difficulty = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.audio_filename) != -1) {
            beatmap.audio_filename = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_md5) != -1) {
            beatmap.beatmap_md5 = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.osu_filename) != -1) {
            beatmap.osu_filename = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.ranked_status) != -1) {
            beatmap.ranked_status = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_hitcircles) != -1) {
            beatmap.number_hitcircles = this.getShort();
        }
        else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_sliders) != -1) {
            beatmap.number_sliders = this.getShort();
        }
        else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_spinners) != -1) {
            beatmap.number_spinners = this.getShort();
        }
        else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_date) != -1) {
            beatmap.mod_date = this.getDateTime();
        }
        else {
            this.skipDateTime();
        }
        if (osu_db_version < 20140609) {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1) {
                beatmap.AR = this.getByte();
                beatmap.CS = this.getByte();
                beatmap.HP = this.getByte();
                beatmap.OD = this.getByte();
            }
            else {
                this.skipByte();
                this.skipByte();
                this.skipByte();
                this.skipByte();
            }
        }
        else {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1) {
                beatmap.AR = this.getSingle();
                beatmap.CS = this.getSingle();
                beatmap.HP = this.getSingle();
                beatmap.OD = this.getSingle();
            }
            else {
                this.skipSingle();
                this.skipSingle();
                this.skipSingle();
                this.skipSingle();
            }
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.slider_velocity) != -1) {
            beatmap.slider_velocity = this.getDouble();
        }
        else {
            this.skipDouble();
        }
        if (osu_db_version >= 20140609) {
            beatmap.SRs = {};
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_std) != -1) {
                beatmap.SRs.std = this.getIntDoublePairs();
            }
            else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_taiko) != -1) {
                beatmap.SRs.taiko = this.getIntDoublePairs();
            }
            else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_ctb) != -1) {
                beatmap.SRs.ctb = this.getIntDoublePairs();
            }
            else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_mania) != -1) {
                beatmap.SRs.mania = this.getIntDoublePairs();
            }
            else {
                this.skipIntDoublePairs();
            }
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.drain_time) != -1) {
            beatmap.drain_time = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.total_time) != -1) {
            beatmap.total_time = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.preview_time) != -1) {
            beatmap.preview_time = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.timing_points) != -1) {
            beatmap.timing_points = this.getTimingPoints();
        }
        else {
            this.skipTimingPoints();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_id) != -1) {
            beatmap.beatmap_id = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmapset_id) != -1) {
            beatmap.beatmapset_id = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.thread_id) != -1) {
            beatmap.thread_id = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_std) != -1) {
            beatmap.grade_achieved_std = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_taiko) != -1) {
            beatmap.grade_achieved_taiko = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_ctb) != -1) {
            beatmap.grade_achieved_ctb = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_mania) != -1) {
            beatmap.grade_achieved_mania = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.local_offset) != -1) {
            beatmap.local_offset = this.getShort();
        }
        else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.stack_laniecy) != -1) {
            beatmap.stack_laniecy = this.getSingle();
        }
        else {
            this.skipSingle();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_mania) != -1) {
            beatmap.gamemode = this.getByte();
        }
        else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.source) != -1) {
            beatmap.source = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.tags) != -1) {
            beatmap.tags = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.online_offset) != -1) {
            beatmap.online_offset = this.getShort();
        }
        else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.font_title) != -1) {
            beatmap.font_title = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_unplayed) != -1) {
            beatmap.is_unplayed = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.last_played) != -1) {
            beatmap.last_played = this.getDateTime();
        }
        else {
            this.skipDateTime();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_OSZ2) != -1) {
            beatmap.is_OSZ2 = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.folder_name) != -1) {
            beatmap.folder_name = this.getString();
        }
        else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.last_checked_repository_time) != -1) {
            beatmap.last_checked_repository_time = this.getDateTime();
        }
        else {
            this.skipDateTime();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_hit_sounds) != -1) {
            beatmap.is_ignore_hit_sounds = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_skin) != -1) {
            beatmap.is_ignore_skin = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_storyboard) != -1) {
            beatmap.is_disable_storyboard = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_video) != -1) {
            beatmap.is_disable_video = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_visual_override) != -1) {
            beatmap.is_visual_override = this.getBool();
        }
        else {
            this.skipBool();
        }
        if (osu_db_version < 20140609) {
            let unknown_value = this.getShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_time) != -1) {
            beatmap.mod_time = this.getInt();
        }
        else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.mania_scroll) != -1) {
            beatmap.mania_scroll = this.getByte();
        }
        else {
            this.skipByte();
        }
        return beatmap;
    }
    bufferRead(offset, length) {
        let buf = Buffer.alloc(length);
        fs_1.default.readSync(this.file_handle, buf, 0, length, offset);
        return buf;
    }
    getDateTime() {
        return (0, ticks_to_date_1.default)(this.getLong());
    }
    skipDateTime() {
        this.cursor_offset += 8;
    }
    getBool() {
        return Boolean(this.getInt(1));
    }
    skipBool() {
        this.cursor_offset += 1;
    }
    getByte() {
        return this.getInt(1);
    }
    skipByte() {
        this.cursor_offset += 1;
    }
    getShort() {
        return this.getInt(2);
    }
    skipShort() {
        this.cursor_offset += 2;
    }
    getLong() {
        let res = this.bufferRead(this.cursor_offset, 8);
        this.cursor_offset += 8;
        return res.readBigInt64LE(0);
    }
    skipLong() {
        this.cursor_offset += 8;
    }
    getInt(length = 4) {
        let res = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch (length) {
            case 1:
                return res.readInt8(0);
            case 2:
                return res.readInt16LE(0);
            case 4:
                return res.readInt32LE(0);
            default: throw new Error('wrong number length');
        }
    }
    skipInt() {
        this.cursor_offset += 4;
    }
    getIntDoublePairs() {
        let result = [];
        let count = this.getInt();
        for (let i = 0; i < count; i++) {
            let sr = { int: 0, double: 0 };
            this.getByte();
            sr.int = this.getInt();
            this.getByte();
            sr.double = this.getDouble();
            result.push(sr);
        }
        return result;
    }
    skipIntDoublePairs() {
        let count = this.getInt();
        this.cursor_offset += 14 * count;
    }
    getTimingPoints() {
        var result = [];
        let count = this.getInt();
        for (let i = 0; i < count; i++) {
            result.push(this.getTimingPoint());
        }
        return result;
    }
    getTimingPoint() {
        let result = { bpm: 0, offset: 0, is_inherit: false };
        result.bpm = this.getDouble();
        result.offset = this.getDouble();
        result.is_inherit = this.getBool();
        return result;
    }
    skipTimingPoints() {
        let timingPointsNumber = this.getInt();
        this.cursor_offset += 17 * timingPointsNumber;
    }
    getSingle() {
        return this.getFloat(4);
    }
    skipSingle() {
        this.cursor_offset += 4;
    }
    getDouble() {
        return this.getFloat(8);
    }
    skipDouble() {
        this.cursor_offset += 8;
    }
    getFloat(length) {
        let buf = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch (length) {
            case 4:
                return buf.readFloatLE(0);
            case 8:
                return buf.readDoubleLE(0);
            default:
                throw new Error('wrong number length');
        }
    }
    getString() {
        let stringCode = this.getByte();
        if (stringCode == 11) {
            let stringLength = this.getULEB128();
            let result = '';
            if (stringLength > 0) {
                result = this.bufferRead(this.cursor_offset, stringLength).toString();
                this.cursor_offset += stringLength;
            }
            return result;
        }
        else {
            console.log('error read string');
            return '';
        }
    }
    skipString() {
        let stringCode = this.getByte();
        if (stringCode == 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                this.cursor_offset += stringLength;
            }
        }
    }
    getULEB128() {
        let result = 0;
        let shift = 0;
        while (true) {
            let byte = this.getInt(1);
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0)
                break;
            shift += 7;
        }
        return result;
    }
}
