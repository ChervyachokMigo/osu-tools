
import { osu_file } from './osu_file';
import { osu_file_type } from '../consts/osu_file_type';
import { score_property } from '../consts/property_settings';
import { score_parse } from '../tools/score_parse';
import { scores_beatmap } from '../consts/scores_beatmap';

export type scores_db_results = {
    osu_version?: number,
    beatmaps_scores: scores_beatmap[]
}

export class scores_db extends osu_file {

    constructor(file_path: string, property_settings?: Array<score_property>){
        super(file_path, property_settings);
    }

    public scores_db_parse(): scores_db_results {
        console.log('start parsing scores db..');

        let scores_db: scores_db_results = {
            osu_version: this.buff.getInt(),
            beatmaps_scores: []
        };

        let beatmaps_size = this.buff.getInt();

        if (beatmaps_size == 0) {
            return scores_db;
        }

        for ( let b = 0; b < beatmaps_size; b++ ) {
            let current_beatmap: scores_beatmap = {
                beatmap_md5: this.buff.getString(), 
                scores: []
            };

            let scores_size = this.buff.getInt();

            if (scores_size > 0){
                for ( let s = 0; s < scores_size; s++ ){
                    current_beatmap.scores.push( 
                        score_parse(this.buff, this.property_settings) 
                    );
                }
            }

            scores_db.beatmaps_scores.push(current_beatmap);
        }

        console.log('end parsing scores db');

        return scores_db;
    }
}

/**
 * @returns scores_db_results with beatmaps includes scores 
 * @param scores_db_path - absolute path to scores.db
 */
export function scores_db_load(scores_db_path: string, score_properties: score_property[]): scores_db_results {
    var file_parse_result: scores_db_results = { beatmaps_scores: [] };
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