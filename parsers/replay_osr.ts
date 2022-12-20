
import { osu_file } from './osu_file';
import { osu_file_type } from '../consts/osu_file_type';
import { score_property } from '../consts/property_settings';
import { score } from '../consts/score';
import { score_parse } from '../tools/score_parse';

export class replay_osr extends osu_file {

    constructor(file_path: string, property_settings?: Array<score_property>){
        super(file_path, property_settings);
    }

    public replay_osr_parse(): score {
        console.log('start parsing replay..');
        var result: score = score_parse(this.buff, this.property_settings);
        console.log('end parsing replay');
        return result;
    }
}

/**
 * @returns score object
 * @param replay_osr_path - absolute path to replay.osr file
 * @example
 * var replay = replay_load('E:\\osu!\\Replays\\replay-osu_3560727_4340069944.osr', all_score_properties);
 */
export function replay_load(replay_osr_path: string, replay_properties: score_property[]): score {
    var file_parse_result: score = { };
    try{
        let replay_osr_file = new replay_osr(replay_osr_path, replay_properties);
        switch (replay_osr_file.get_type()){
            case osu_file_type.replay_osr:
                file_parse_result = replay_osr_file.replay_osr_parse();
                break;
                default:
                    throw new Error('file type not osu replay file');
        }
        
        replay_osr_file.close();

        return file_parse_result;
    } catch (e){
        console.log(e)
        return file_parse_result;
    }
}