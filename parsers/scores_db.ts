
import { osu_file } from './osu_file';
import { osu_file_type } from '../consts/osu_file_type';
import { score_property } from '../consts/parse_settings';
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

        score.gamemode_int = this.buff.getByte();
        score.gamemode = Gamemode[score.gamemode_int];

        score.score_version = this.buff.getInt();
        score.beatmap_md5 = this.buff.getString();
        score.playername = this.buff.getString();
        score.replay_md5 = this.buff.getString();

        score.count_300 = this.buff.getShort();
        score.count_100 = this.buff.getShort();
        score.count_50 = this.buff.getShort();
        score.count_geki = this.buff.getShort();
        score.count_katu = this.buff.getShort();
        score.count_miss = this.buff.getShort();

        score.scores = this.buff.getInt();
        score.combo = this.buff.getShort();
        score.is_fc = this.buff.getBool();

        score.mods_int = this.buff.getInt();
        score.mods = ModsIntToText(score.mods_int);

        score.hp_bar = this.buff.getString(); //parseperrystring //getLZMAString
        score.date = this.buff.getDateTime();
        let replay_data_size = this.buff.getInt();
        console.log(replay_data_size)
        score.replay_data = [];//let replay_data_buffer = await osufile.getStringBytes(replay_data_length);
        score.online_id = this.buff.getLong();
        if(score.mods.includes('Target')){
            score.target_practice_accuracy = this.buff.getDouble();
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