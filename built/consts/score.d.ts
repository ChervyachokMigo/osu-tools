import { Gamemode, HP_Bar, ReplayData } from './variable_types';
export declare type score = {
    gamemode_int?: Gamemode;
    gamemode?: string;
    score_version?: number;
    beatmap_md5?: string;
    playername?: string;
    replay_md5?: string;
    count_300?: number;
    count_100?: number;
    count_50?: number;
    count_geki?: number;
    count_katu?: number;
    count_miss?: number;
    scores?: number;
    combo?: number;
    is_fc?: boolean;
    mods_int?: number;
    mods?: string[];
    hp_bar?: HP_Bar[];
    windows_tick_date?: BigInt;
    replay_data?: ReplayData;
    online_id?: bigint;
    target_practice_accuracy?: number;
};
//# sourceMappingURL=score.d.ts.map