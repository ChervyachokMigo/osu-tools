import fs from 'fs';
import path from 'path';

import ticksToDate from 'ticks-to-date';


import {TimingPoint, IntDoublePair, Int, Double} from './variable_types';

enum UserPermissions {
    None = 0, 
    Normal = 1, 
    Moderator = 2,
    Supporter = 4, 
    Friend = 8, 
    peppy = 16, 
    World_Cup_staff = 32
}

enum Gamemodes {
    std = 0, 
    taiko = 1, 
    ctb = 2, 
    mania = 3
}

enum RankedStatus {
    unknown = 0, 
    unsubmitted = 1, 
    pending = 2,
    wip = 2,
    graveyard = 2, 
    unused = 3, 
    ranked = 4, 
    approved = 5, 
    qualified = 6, 
    loved = 7
}

type Beatmap = {
    beatmap_size?: number,
    artist?: string,
    artist_unicode?: string,
    title?: string,
    title_unicode?: string,
    creator?: string,
    difficulty?: string,
    audio_filename?: string,
    beatmap_md5?: string,
    osu_filename?: string,
    ranked_status?: number,
    number_hitcircles?: number,
    number_sliders?: number,
    number_spinners?: number,
    mod_date?: Date | null,
    AR?: number,
    CS?: number,
    HP?: number,
    OD?: number,
    slider_velocity?: number,
    SRs?: {
        std?: Array<IntDoublePair>,
        taiko?: Array<IntDoublePair>,
        ctb?: Array<IntDoublePair>,
        mania?: Array<IntDoublePair>,
    },
    drain_time?: number,
    total_time?: number,
    preview_time?: number,
    timing_points?: Array<TimingPoint>,
    beatmap_id?: number,
    beatmapset_id?: number,
    thread_id?: number,
    grade_achieved_std?: number,
    grade_achieved_taiko?: number,
    grade_achieved_ctb?: number,
    grade_achieved_mania?: number,
    local_offset?: number,
    stack_laniecy?: number,
    gamemode?: Gamemodes,
    source?: string,
    tags?: string,
    online_offset?: number,
    font_title?: string,
    is_unplayed?: boolean,
    last_played?: Date | null,
    is_OSZ2?: boolean,
    folder_name?: string,
    last_checked_repository_time?: Date | null,
    is_ignore_hit_sounds?: boolean,
    is_ignore_skin?: boolean,
    is_disable_storyboard?: boolean,
    is_disable_video?: boolean,
    is_visual_override?: boolean,
    //unknown_value?: number,
    mod_time?: number,
    mania_scroll?: number
}

type osu_db = {
    number_beatmaps?: number,
    beatmaps?: Array<Beatmap>,
    is_loaded: boolean,
    osu_version?: number,
    folder_count?: number,
    is_account_unlocked?: boolean,
    account_unlocked_date?: Date | null,
    playername?: string,
    user_permissions?: number
}

type osu_db_result = osu_db | false;

export function osu_file_load(osu_path: string, parse_settings: Array<osu_db_parse_setting>): osu_db_result {
    var file_parse_result: osu_db_result = false;
    try{
        let osu_db_file = new osu_file(osu_path, parse_settings);
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

enum osu_file_type {
    none = -1,
    osu_db = 'osu!.db',
    collection_db = 'collection.db',
    scores_db = 'scores.db',
    presence_db = 'presence.db',
}

export enum osu_db_parse_setting {
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

class osu_file {
    private cursor_offset: number = 0;
    private file_handle: any;
    private file_basename: string;
    private file_path: string;
    private file_type: osu_file_type;
    private parse_settings: Array<osu_db_parse_setting>;

    constructor(file_path: string, parse_settings?: Array<osu_db_parse_setting>) {
        this.file_type = osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);

        if ( !this.set_type() ){
            throw new Error('wrong file type. It not osu file')
        }

        if (parse_settings && parse_settings.length>0) {
            this.parse_settings = parse_settings;
        } else {
            this.parse_settings = [];
        }
        
        try{
            this.file_handle = fs.openSync(`${file_path}`, 'r');
        } catch (error){
            console.log(error);
            throw new Error('can not open osu file');
        }
        return this;
    }

    close(): void{
        return fs.closeSync(this.file_handle);
    }

    get_type(): osu_file_type {
        return this.file_type;
    }

    set_type(): boolean {
        if (path.extname(this.file_basename) === '.db'){
            
            if (this.file_basename.startsWith(osu_file_type.osu_db)){
                this.file_type = osu_file_type.osu_db;
            } else {
                switch (this.file_basename){
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
            if (this.file_type === osu_file_type.none){
                return false;
            }
            return true;
        } else {
            return false
        }
    }

    set_parse_settings(parse_settings: Array<osu_db_parse_setting>){    
        if (parse_settings && parse_settings.length>0) {
            this.parse_settings = parse_settings;
        } else {
            throw new Error('wrong parse settings');
        }
    }

    osu_db_parse(): osu_db_result {
        let osu_db: osu_db = {is_loaded: false}

        if (typeof this.parse_settings === 'undefined' ||  this.parse_settings.length == 0){
            throw new Error('set parse settings first');
        }

        osu_db.osu_version = this.getInt();
        osu_db.folder_count = this.getInt();
        osu_db.is_account_unlocked = this.getBool();
        osu_db.account_unlocked_date =  this.getDateTime();
        osu_db.playername = this.getString();
        osu_db.number_beatmaps = this.getInt();
        
        osu_db.beatmaps = [];

        for (let i = 0; i < osu_db.number_beatmaps; i++){
            let beatmap_data = this.osu_db_beatmap_parse(osu_db.osu_version);
            console.log(i, beatmap_data);
            osu_db.beatmaps.push (beatmap_data);
        }
        //osu_db.user_permissions = this.getInt();
        return osu_db;
    }

    osu_db_beatmap_parse(osu_db_version: number): Beatmap{
        var beatmap: Beatmap = {};
        
        if (osu_db_version < 20191106){
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_size) != -1){
                beatmap.beatmap_size = this.getInt();
            } else {
                this.skipInt();
            }
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.artist) != -1){
            beatmap.artist = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.artist_unicode) != -1){
            beatmap.artist_unicode = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title) != -1){
            beatmap.title = this.getString()
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.title_unicode) != -1){
            beatmap.title_unicode = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.creator) != -1){
            beatmap.creator = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.difficulty) != -1){
            beatmap.difficulty = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.audio_filename) != -1){
            beatmap.audio_filename = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_md5) != -1){
            beatmap.beatmap_md5 = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.osu_filename) != -1){
            beatmap.osu_filename = this.getString();
        } else {
            this.skipString();
        }
        
        if (this.parse_settings.indexOf(osu_db_parse_setting.ranked_status) != -1){
            beatmap.ranked_status = this.getByte();
        } else {
            this.skipByte();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_hitcircles) != -1){
            beatmap.number_hitcircles = this.getShort();
        } else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_sliders) != -1){
            beatmap.number_sliders = this.getShort();
        } else {
            this.skipShort();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.number_spinners) != -1){
            beatmap.number_spinners = this.getShort();
        } else {
            this.skipShort();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_date) != -1){
            beatmap.mod_date = this.getDateTime();
        } else {
            this.skipDateTime();
        }
    
        if (osu_db_version<20140609){
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1){
                beatmap.AR = this.getByte();
                beatmap.CS = this.getByte();
                beatmap.HP = this.getByte();
                beatmap.OD = this.getByte();
            } else {
                this.skipByte();
                this.skipByte();
                this.skipByte();
                this.skipByte();
            }
        } else {
            if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_stats) != -1){
                beatmap.AR = this.getSingle();
                beatmap.CS = this.getSingle();
                beatmap.HP = this.getSingle();
                beatmap.OD = this.getSingle();
            } else {
                this.skipSingle();
                this.skipSingle();
                this.skipSingle();
                this.skipSingle();
            }
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.slider_velocity) != -1){
            beatmap.slider_velocity = this.getDouble();
        } else {
            this.skipDouble();
        }
        
        if (osu_db_version >= 20140609){
            beatmap.SRs = {};
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_std) != -1){
                beatmap.SRs.std = this.getIntDoublePairs();
            } else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_taiko) != -1){
                beatmap.SRs.taiko = this.getIntDoublePairs();
            } else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_ctb) != -1){
                beatmap.SRs.ctb = this.getIntDoublePairs();
            } else {
                this.skipIntDoublePairs();
            }
            if (this.parse_settings.indexOf(osu_db_parse_setting.star_rating_mania) != -1){
                beatmap.SRs.mania = this.getIntDoublePairs();
            }    else {
                this.skipIntDoublePairs();
            }         
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.drain_time) != -1){
            beatmap.drain_time = this.getInt();
        } else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.total_time) != -1){
            beatmap.total_time = this.getInt();
        } else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.preview_time) != -1){
            beatmap.preview_time = this.getInt();
        } else {
            this.skipInt();
        }
        
        if (this.parse_settings.indexOf(osu_db_parse_setting.timing_points) != -1){
            beatmap.timing_points = this.getTimingPoints();
        } else {
            this.skipTimingPoints();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmap_id) != -1){
            beatmap.beatmap_id = this.getInt();
        } else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.beatmapset_id) != -1){
            beatmap.beatmapset_id = this.getInt();
        } else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.thread_id) != -1){
            beatmap.thread_id = this.getInt();
        } else {
            this.skipInt();
        }
        
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_std) != -1){
            beatmap.grade_achieved_std = this.getByte();
        } else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_taiko) != -1){
            beatmap.grade_achieved_taiko = this.getByte();
        } else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_ctb) != -1){
            beatmap.grade_achieved_ctb = this.getByte();
        } else {
            this.skipByte();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_mania) != -1){
            beatmap.grade_achieved_mania = this.getByte();
        } else {
            this.skipByte();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.local_offset) != -1){
            beatmap.local_offset = this.getShort();
        } else {
            this.skipShort();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.stack_laniecy) != -1){
            beatmap.stack_laniecy = this.getSingle();
        } else {
            this.skipSingle();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.grade_achieved_mania) != -1){
            beatmap.gamemode = this.getByte();
        } else {
            this.skipByte();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.source) != -1){
            beatmap.source = this.getString();
        } else {
            this.skipString();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.tags) != -1){
            beatmap.tags = this.getString();
        } else {
            this.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.online_offset) != -1){
            beatmap.online_offset = this.getShort();
        } else {
            this.skipShort();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.font_title) != -1){
            beatmap.font_title = this.getString();
        } else {
            this.skipString();
        }

        if (this.parse_settings.indexOf(osu_db_parse_setting.is_unplayed) != -1){
            beatmap.is_unplayed = this.getBool();
        } else {
            this.skipBool();
        }
        
        if (this.parse_settings.indexOf(osu_db_parse_setting.last_played) != -1){
            beatmap.last_played = this.getDateTime();
        } else {
            this.skipDateTime();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_OSZ2) != -1){
            beatmap.is_OSZ2 = this.getBool();
        } else {
            this.skipBool();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.folder_name) != -1){
            beatmap.folder_name = this.getString();
        } else {
            this.skipString();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.last_checked_repository_time) != -1){
            beatmap.last_checked_repository_time = this.getDateTime();
        } else {
            this.skipDateTime();
        }
    
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_hit_sounds) != -1){
            beatmap.is_ignore_hit_sounds = this.getBool();
        } else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_ignore_skin) != -1){
            beatmap.is_ignore_skin = this.getBool();
        } else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_storyboard) != -1){
            beatmap.is_disable_storyboard = this.getBool();
        } else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_disable_video) != -1){
            beatmap.is_disable_video = this.getBool();
        } else {
            this.skipBool();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.is_visual_override) != -1){
            beatmap.is_visual_override = this.getBool();
        } else {
            this.skipBool();
        }
    
        if (osu_db_version<20140609){
            let unknown_value = this.getShort();
        }
        
        if (this.parse_settings.indexOf(osu_db_parse_setting.mod_time) != -1){
            beatmap.mod_time = this.getInt();
        } else {
            this.skipInt();
        }
        if (this.parse_settings.indexOf(osu_db_parse_setting.mania_scroll) != -1){
            beatmap.mania_scroll = this.getByte();
        } else {
            this.skipByte();
        }
        
        return beatmap;
    }

    bufferRead (offset: number, length: number): Buffer{
        let buf = Buffer.alloc(length);
        fs.readSync(this.file_handle, buf, 0, length, offset);
        return buf;
    }

    getDateTime(): Date | null {
        return ticksToDate(this.getLong());
    }

    skipDateTime(): void {
        this.cursor_offset += 8;
    }

    getBool(): boolean {
        return Boolean(this.getInt(1));
    }

    skipBool(): void {
        this.cursor_offset += 1;
    }

    getByte(): number {
        return this.getInt(1);
    }

    skipByte(): void {
        this.cursor_offset += 1;
    }

    getShort(): number {
        return this.getInt(2);
    }

    skipShort(): void {
        this.cursor_offset += 2;
    }

    getLong (): bigint {
        let res = this.bufferRead(this.cursor_offset, 8);
        this.cursor_offset += 8;
        return res.readBigInt64LE(0);
    }

    skipLong(): void {
        this.cursor_offset += 8;
    }

    getInt(length: number = 4): number {
        let res = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch(length){
            case 1:
                return res.readInt8(0);
            case 2:
                return res.readInt16LE(0);
            case 4:
                return res.readInt32LE(0);
            default: throw new Error('wrong number length')
        }
    }

    skipInt(): void {
        this.cursor_offset += 4;
    }

    getIntDoublePairs() : Array<IntDoublePair> {
		let result: Array<IntDoublePair> = [];
		let count = this.getInt();

		for (let i = 0; i < count; i++){
			let sr: IntDoublePair = { int: 0, double: 0 };

			this.getByte()
			sr.int = this.getInt();

			this.getByte()
			sr.double = this.getDouble();

			result.push(sr)
		}
		return result
 
	}

    skipIntDoublePairs (): void{
		let count = this.getInt()
        this.cursor_offset += 14 * count;
	}

    getTimingPoints(): Array<TimingPoint>{
        var result: Array<TimingPoint> = [];
		let count = this.getInt();
		
		for (let i = 0; i < count; i++ ){
			result.push( this.getTimingPoint() );
		}
		return result;
	}

	getTimingPoint(): TimingPoint{
		let result: TimingPoint = {bpm: 0, offset: 0, is_inherit: false};

		result.bpm = this.getDouble();
		result.offset = this.getDouble();
		result.is_inherit = this.getBool();

		return result
	}

    skipTimingPoints(): void{
        let timingPointsNumber = this.getInt();
        this.cursor_offset += 17 * timingPointsNumber;
    }

    getSingle (): number {
		return this.getFloat(4);
	}

    skipSingle(): void {
        this.cursor_offset += 4;
    }

    getDouble(): number {
		return this.getFloat(8);
    }

    skipDouble(): void {
        this.cursor_offset += 8;
    }

    getFloat(length: number): number {
        let buf: Buffer = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch(length){
            case 4:
                return buf.readFloatLE(0);
            case 8:
                return buf.readDoubleLE(0);
            default: 
                throw new Error('wrong number length')
        }
    }

    getString() : string {		
		let stringCode = this.getByte();
		if (stringCode == 11){
				let stringLength = this.getULEB128();
				let result = '';
				if (stringLength > 0){
					result = this.bufferRead(this.cursor_offset, stringLength).toString();
			        this.cursor_offset += stringLength;
				}
				return result;
		} else {
			console.log('error read string');
            return '';
		}
	}

    skipString(): void {
        let stringCode = this.getByte();
        if (stringCode == 11){
            let stringLength = this.getULEB128();
            if (stringLength > 0){
                this.cursor_offset += stringLength;
            }
        }
    }

    getULEB128(): number {
		let result: number = 0;
		let shift: number = 0;
		while (true) {
			let byte: any = this.getInt(1);
			result |= (byte & 0x7f) << shift;
			if ((byte & 0x80) === 0)
				break;
			shift += 7;
		}
		return result;
	}
}

