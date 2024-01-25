import { UserPermissions } from './variable_types';
import { beatmap_results } from './beatmap_results';
export declare type osu_db_results = {
    number_beatmaps?: number;
    beatmaps: beatmap_results[];
    osu_version?: number;
    folder_count?: number;
    is_account_unlocked?: boolean;
    account_unlocked_date?: Date;
    playername?: string;
    user_permissions_int?: UserPermissions;
    user_permissions?: string;
};
//# sourceMappingURL=osu_db_results.d.ts.map