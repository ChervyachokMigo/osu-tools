import { beatmap_data } from "../consts/beatmap_data";
import { osu_file_beatmap_property } from "../consts/property_settings";
export type scanner_options = {
    is_read_only: boolean;
    is_hit_objects_only_count: boolean;
    songs_folder: string;
    is_display_complete_time: boolean;
    is_check_osb: boolean;
};
export declare function songs_get_all_beatmaps(osufolder: string, osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options, callback: Function): beatmap_data[];
export declare function get_beatmaps_from_beatmap_folder(osufolder: string, folder_path: string, osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options): beatmap_data[];
export declare function parse_osu_file(osu_file_path: string, osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options): beatmap_data;
//# sourceMappingURL=scan_songs.d.ts.map