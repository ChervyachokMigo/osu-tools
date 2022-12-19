
import { osu_file } from './osu_file';
import { osu_file_type } from '../consts/osu_file_type';
import { score_property } from '../consts/property_settings';
import { Gamemode } from '../consts/variable_types';
import { ModsIntToText } from '../consts/modes';

export type scores_db_results = {
    osu_version?: number,
    beatmaps: scores_db_beatmap[]
}

export type scores_db_beatmap = {
    beatmap_md5: string,
    scores: score[]
}

export type score = {
    gamemode_int?: Gamemode,
    gamemode?: string,
    score_version?: number,
    beatmap_md5?: string,
    playername?: string,
    replay_md5?: string,
    count_300?: number,
    count_100?: number,
    count_50?: number,
    count_geki?: number,
    count_katu?: number,
    count_miss?: number,
    scores?: number,
    combo?: number,
    is_fc?: boolean,
    mods_int?: number,
    mods?: string[],
    hp_bar?: string,
    date?: Date,
    replay_data?: string[],
    online_id?: bigint,
    target_practice_accuracy?: number
}

export class scores_db extends osu_file {

    constructor(file_path: string, property_settings?: Array<score_property>){
        super(file_path, property_settings);
    }

    public scores_db_parse(): scores_db_results {
        console.log('start parsing scores db..');

        let scores_db: scores_db_results = {
            osu_version: this.buff.getInt(),
            beatmaps: []
        };

        let beatmaps_size = this.buff.getInt();

        if (beatmaps_size == 0) {
            return scores_db;
        }

        for ( let b = 0; b < beatmaps_size; b++ ) {
            let current_beatmap: scores_db_beatmap = {
                beatmap_md5: this.buff.getString(), 
                scores: []
            };

            let scores_size = this.buff.getInt();

            if (scores_size > 0){
                for ( let s = 0; s < scores_size; s++ ){
                    current_beatmap.scores.push(this.score_parse());
                }
            }

            scores_db.beatmaps.push(current_beatmap);
        }

        console.log('end parsing scores db');

        return scores_db;
    }

    private score_parse ():score {
        let score: score = {};

        if (this.property_settings.indexOf(score_property.gamemode) != -1) {
            score.gamemode_int = this.buff.getByte();
            score.gamemode = Gamemode[score.gamemode_int];
        } else {
            this.buff.skipByte();
        }

        if (this.property_settings.indexOf(score_property.score_version) != -1) {
            score.score_version = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }

        if (this.property_settings.indexOf(score_property.beatmap_md5) != -1) {
            score.beatmap_md5 = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.property_settings.indexOf(score_property.playername) != -1) {
            score.playername = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.property_settings.indexOf(score_property.replay_md5) != -1) {
            score.replay_md5 = this.buff.getString();
        } else {
            this.buff.skipString();
        }

        if (this.property_settings.indexOf(score_property.count_300) != -1) {
            score.count_300 = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.count_100) != -1) {
            score.count_100 = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.count_50) != -1) {
            score.count_50 = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.count_geki) != -1) {
            score.count_geki = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.count_katu) != -1) {
            score.count_katu = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.count_miss) != -1) {
            score.count_miss = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.scores) != -1) {
            score.scores = this.buff.getInt();
        } else {
            this.buff.skipInt();
        }

        if (this.property_settings.indexOf(score_property.combo) != -1) {
            score.combo = this.buff.getShort();
        } else {
            this.buff.skipShort();
        }

        if (this.property_settings.indexOf(score_property.is_fc) != -1) {
            score.is_fc = this.buff.getBool();
        } else {
            this.buff.skipBool();
        }

        const mods_int = this.buff.getInt();
        const mods = ModsIntToText(mods_int);

        if (this.property_settings.indexOf(score_property.is_fc) != -1) {
            score.mods_int = mods_int;
            score.mods = mods;
        } // else nothing

        const hp_bar = this.buff.getString(); //parseperrystring //getLZMAString
        if (hp_bar.length > 0 ){
            if (this.property_settings.indexOf(score_property.hp_bar) != -1) {
                score.hp_bar = hp_bar;
            }
        } //else nothing

        if (this.property_settings.indexOf(score_property.date) != -1) {
            score.date = this.buff.getDateTime();
        } else {
            this.buff.skipDateTime();
        }

        const replay_data_size = this.buff.getInt();
        
        if (this.property_settings.indexOf(score_property.replay_data) != -1) {
            if (replay_data_size != -1){
                //score.replay_data = //parse getstringbytes
            }
        }
        
        //let replay_data_buffer = await osufile.getStringBytes(replay_data_length);

        if (this.property_settings.indexOf(score_property.online_id) != -1) {
            score.online_id = this.buff.getLong();
        } else {
            this.buff.skipLong();
        }

        if(mods.indexOf('Target') != -1){
            if (this.property_settings.indexOf(score_property.target_practice_accuracy) != -1) {
                score.target_practice_accuracy = this.buff.getDouble();
            } else {
                this.buff.skipDouble();
            }
        }

        return score;
    }
}

/**
 * @returns scores_db_results with beatmaps includes scores 
 * @param scores_db_path - absolute path to scores.db
 */
export function scores_db_load(scores_db_path: string, score_properties: score_property[]): scores_db_results {
    var file_parse_result: scores_db_results = { beatmaps: [] };
    try{
        let scores_db_file = new scores_db(scores_db_path, score_properties);
        switch (scores_db_file.get_type()){
            case osu_file_type.scores_db:
                file_parse_result = scores_db_file.scores_db_parse();
                break;
                default:
                    throw new Error('file type not osu file');
        }
        
        scores_db_file.close();

        return file_parse_result;
    } catch (e){
        console.log(e)
        return file_parse_result;
    }
}