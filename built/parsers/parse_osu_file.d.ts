import { beatmap_data } from "../consts/beatmap_data";
import { osu_file_beatmap_property } from "../consts/property_settings";
export type scanner_options = {
    is_read_only?: boolean;
    is_hit_objects_only_count?: boolean;
    songs_folder?: string;
    is_display_complete_time?: boolean;
    is_check_osb?: boolean;
    is_parse_sliders?: boolean;
    is_print_progress?: boolean;
};
export declare const default_scanner_options: scanner_options;
export declare function parse_osu_file(osu_file_path: string, osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options): beatmap_data;
//# sourceMappingURL=parse_osu_file.d.ts.map