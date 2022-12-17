
import { osu_db_parse_setting } from './parse_settings';
import { osu_file } from './osu_file';
import { osu_file_type } from './osu_file_type';

import { RankedStatus, Gamemode, UserPermissions } from './variable_types';
import { beatmap_results } from './beatmap_results';

export type osu_db_results = {
    number_beatmaps?: number,
    beatmaps: beatmap_results[],
    osu_version?: number,
    folder_count?: number,
    is_account_unlocked?: boolean,
    account_unlocked_date?: Date,
    playername?: string,
    user_permissions_int?: UserPermissions
    user_permissions?: string
}

export class osu_db extends osu_file {

    constructor(file_path: string, parse_settings?: osu_db_parse_setting[] ){
        super(file_path, parse_settings);
    }

    public osu_db_parse(): osu_db_results {
        let osu_db: osu_db_results = {beatmaps: []};
        console.log('start parsing osu db..');

        if (this.parse_settings.length == 0) {
            console.error('no set parse settings, results will without beatmaps');
        }

        osu_db.osu_version = this.buff.getInt();
        osu_db.folder_count = this.buff.getInt();
        osu_db.is_account_unlocked = this.buff.getBool();
        osu_db.account_unlocked_date = this.buff.getDateTime();
        osu_db.playername = this.buff.getString();
        osu_db.number_beatmaps = this.buff.getInt();

        let one_percent_value = Math.trunc(osu_db.number_beatmaps/100);

        for (let i = 0; i < osu_db.number_beatmaps; i++) {

            let beatmap_data = this.osu_db_beatmap_parse(osu_db.osu_version);
            if (Object.keys(beatmap_data).length > 0){
                osu_db.beatmaps.push(beatmap_data);
            }

            if ( i % one_percent_value == 0){
                console.log((i/osu_db.number_beatmaps*100).toFixed(2),'% complete');
            }
        }
        osu_db.user_permissions_int = this.buff.getInt();
        osu_db.user_permissions = UserPermissions[osu_db.user_permissions_int];

        console.log('end parsing osu db');

        return osu_db;
        
    }

    private osu_db_beatmap_parse(osu_db_version: number): beatmap_results {
        var beatmap: beatmap_results = {};

        if (osu_db_version < 20191106) {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_size) != -1) {
                beatmap.beatmap_size = this.buff.getInt();
            } else {
                this.buff.skipInt();
            }
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.artist) != -1) {
            beatmap.artist = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.artist_unicode) != -1) {
            beatmap.artist_unicode = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title) != -1) {
            beatmap.title = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title_unicode) != -1) {
            beatmap.title_unicode = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.creator) != -1) {
            beatmap.creator = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.difficulty) != -1) {
            beatmap.difficulty = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.audio_filename) != -1) {
            beatmap.audio_filename = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_md5) != -1) {
            beatmap.beatmap_md5 = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.osu_filename) != -1) {
            beatmap.osu_filename = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.ranked_status) != -1) {
            beatmap.ranked_status_int = this.buff.getByte();
            beatmap.ranked_status = RankedStatus[beatmap.ranked_status_int];
        } else {
            this.buff.skipByte();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.number_hitcircles) != -1) {
            beatmap.number_hitcircles = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_sliders) != -1) {
            beatmap.number_sliders = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_spinners) != -1) {
            beatmap.number_spinners = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_date) != -1) {
            beatmap.mod_date = this.buff.getDateTime();            
        } else {
            this.buff.skipDateTime();
        }

        if (osu_db_version < 20140609) {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1) {
                beatmap.AR = this.buff.getByte();
                beatmap.CS = this.buff.getByte();
                beatmap.HP = this.buff.getByte();
                beatmap.OD = this.buff.getByte();
            } else {
                this.buff.skipByte();
                this.buff.skipByte();
                this.buff.skipByte();
                this.buff.skipByte();
            }
        } else {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1) {
                beatmap.AR = this.buff.getSingle();
                beatmap.CS = this.buff.getSingle();
                beatmap.HP = this.buff.getSingle();
                beatmap.OD = this.buff.getSingle();
            } else {
                this.buff.skipSingle();
                this.buff.skipSingle();
                this.buff.skipSingle();
                this.buff.skipSingle();
            }
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.slider_velocity) != -1) {
            beatmap.slider_velocity = this.buff.getDouble();
        } else {
            this.buff.skipDouble();
        }

        if (osu_db_version >= 20140609) {
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_std) != -1) {
                beatmap.star_rating_std = this.buff.getStarRatings();
            } else {
                this.buff.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_taiko) != -1) {
                beatmap.star_rating_taiko = this.buff.getStarRatings();
            } else {
                this.buff.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_ctb) != -1) {
                beatmap.star_rating_ctb = this.buff.getStarRatings();
            } else {
                this.buff.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_mania) != -1) {
                beatmap.star_rating_mania = this.buff.getStarRatings();
            } else {
                this.buff.skipIntDoublePairs();
            }
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.drain_time) != -1) {
            beatmap.drain_time = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.total_time) != -1) {
            beatmap.total_time = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.preview_time) != -1) {
            beatmap.preview_time = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.timing_points) != -1) {
            beatmap.timing_points = this.buff.getTimingPoints();
        } else {
            this.buff.skipTimingPoints();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_id) != -1) {
            beatmap.beatmap_id = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmapset_id) != -1) {
            beatmap.beatmapset_id = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.thread_id) != -1) {
            beatmap.thread_id = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_std) != -1) {
            beatmap.grade_achieved_std = this.buff.getByte();
        } else {
            this.buff.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_taiko) != -1) {
            beatmap.grade_achieved_taiko = this.buff.getByte();
        } else {
            this.buff.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_ctb) != -1) {
            beatmap.grade_achieved_ctb = this.buff.getByte();
        } else {
            this.buff.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_mania) != -1) {
            beatmap.grade_achieved_mania = this.buff.getByte();
        } else {
            this.buff.skipByte();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.local_offset) != -1) {
            beatmap.local_offset = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.stack_laniecy) != -1) {
            beatmap.stack_laniecy = this.buff.getSingle();
        } else {
            this.buff.skipSingle();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.gamemode) != -1) {
            beatmap.gamemode_int = this.buff.getByte();
            beatmap.gamemode = Gamemode[beatmap.gamemode_int];
        } else {
            this.buff.skipByte();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.source) != -1) {
            beatmap.source = this.buff.getString();
        } else {
            this.buff.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.tags) != -1) {
            beatmap.tags = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.online_offset) != -1) {
            beatmap.online_offset = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.font_title) != -1) {
            beatmap.font_title = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.is_unplayed) != -1) {
            beatmap.is_unplayed = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.last_played) != -1) {
            beatmap.last_played = this.buff.getDateTime();
        } else {
            this.buff.skipDateTime();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.is_OSZ2) != -1) {
            beatmap.is_OSZ2 = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.folder_name) != -1) {
            beatmap.folder_name = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.last_checked_repository_time) != -1) {
            beatmap.last_checked_repository_time = this.buff.getDateTime();
        } else {
            this.buff.skipDateTime();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_hit_sounds) != -1) {
            beatmap.is_ignore_hit_sounds = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_skin) != -1) {
            beatmap.is_ignore_skin = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_storyboard) != -1) {
            beatmap.is_disable_storyboard = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_video) != -1) {
            beatmap.is_disable_video = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_visual_override) != -1) {
            beatmap.is_visual_override = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }

        if (osu_db_version < 20140609) {
            let unknown_value = this.buff.getShort();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_time) != -1) {
            beatmap.mod_time = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.mania_scroll) != -1) {
            beatmap.mania_scroll = this.buff.getByte();
        } else {
            this.buff.skipByte();
        }

        return beatmap;
    }
}

/**
 * @returns osu_db_results with all beatmaps information
 * @param osu_db_path - absolute path to osu.db
 * @also use `osu_db_all_parse_settings` for set all beatmap settings
 */
export function osu_db_load(osu_db_path: string, parse_settings?: Array<osu_db_parse_setting>): osu_db_results {
    var file_parse_result: osu_db_results = { beatmaps: [] };
    try{
        let osu_db_file = new osu_db(osu_db_path, parse_settings);
        switch (osu_db_file.get_type()){
            case osu_file_type.osu_db:
                file_parse_result = osu_db_file.osu_db_parse();
                break;
                default:
                    throw new Error('file type not osu file');
        }
        
        osu_db_file.close();

        return file_parse_result;
    } catch (e){
        console.log(e)
        return file_parse_result;
    }
}

/*
function beatmaps_save(){
    try{
        fs.writeFileSync(osu_db_JSON_filename, JSON.stringify(osu_db.beatmaps), {encoding: 'utf-8'});
        return true;
    } catch (e){
        console.log(e);
        return false;
    }
}

function beatmaps_load(){
    try{
        osu_db.beatmaps = JSON.parse(fs.readFileSync(osu_db_JSON_filename, {encoding: 'utf-8'}));
        return true;
    } catch (e){
        if (e.code === 'ENOENT'){
            return false;
        }
        console.log(e);
        return false;
    }
}


function add_new_beatmaps(beatmaps){
    console.log('Добавление новых '+beatmaps.length+' карт в osu_db')
    for (let beatmap of beatmaps){
        osu_db.beatmaps.push (beatmap);
    }
    console.log('Пересохранение osu_db..');
    beatmaps_save();
    console.log('Пересохранено osu_db');
}

function find_beatmap_by_md5(beatmap_md5){
    let beatmap = (osu_db.beatmaps.filter(val=>val.beatmap_md5 === beatmap_md5)).shift();
    if (typeof beatmap !== 'undefined'){
        return beatmap;
    } else {
        return false;
    }
}

function find_beatmapset_by_id(beatmapset_id){
    let beatmap = osu_db.beatmaps.filter(val=>val.beatmapsetID === beatmapset_id);
    if (typeof beatmap !== 'undefined'){
        return beatmap;
    } else {
        return false;
    }
}

function get_beatmaps_by_mode_and_star(mode, star_min, star_max){
    let beatmaps = osu_db.beatmaps.filter(val=>{
        if (!val.SRs.taiko || val.SRs.taiko.length == 0) {
            return false
        }
        let sr_taiko = val.SRs.taiko[0].starrating_double;
        return beatmap_modes[val.gamemode] === mode && sr_taiko > star_min && sr_taiko < star_max;
    });
    return beatmaps;
}*/