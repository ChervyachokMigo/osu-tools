import { osu_file } from './osu_file';
import { score_property } from '../consts/property_settings';
import { score } from '../consts/score';
export declare class replay_osr extends osu_file {
    constructor(file_path: string, property_settings?: Array<score_property>);
    replay_osr_parse(): score;
}
/**
 * @returns score object
 * @param replay_osr_path - absolute path to replay.osr file
 * @example
 * var replay = replay_load('E:\\osu!\\Replays\\replay-osu_3560727_4340069944.osr', all_score_properties);
 */
export declare function replay_load(replay_osr_path: string, replay_properties: score_property[]): score;
//# sourceMappingURL=replay_osr.d.ts.map