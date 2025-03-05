import { existsSync, lstatSync } from "fs";

import path from "path";

import { beatmap_data } from "../consts/beatmap_data";

import { osu_file_beatmap_property } from "../consts/property_settings";

import { globSync, glob, Path } from "glob";
import { display_progress, display_progress_reset } from "../tools/display_progress";

import { parse_osu_file } from "./parse_osu_file";

export type scanner_options = {
    is_read_only?: boolean,
    is_hit_objects_only_count?: boolean,
	songs_folder?: string,
	is_display_complete_time?: boolean,
	is_check_osb?: boolean,
	is_parse_sliders?: boolean,
	is_print_progress?: boolean
}

export const default_scanner_options: scanner_options = {
	is_read_only: false,
    is_hit_objects_only_count: true,
    songs_folder: 'Songs',
    is_display_complete_time: false,
    is_check_osb: true,
    is_parse_sliders: false,
    is_print_progress: true
}

export function songs_get_all_beatmaps ( 
	osufolder: string, osu_file_beatmap_properties: osu_file_beatmap_property[], 
    options: scanner_options, callback: Function): beatmap_data[] {

	if (typeof options.is_read_only === 'undefined') options.is_read_only = false;
	if (typeof options.is_hit_objects_only_count === 'undefined') options.is_hit_objects_only_count = true;
	if (typeof options.songs_folder === 'undefined') options.songs_folder = 'Songs';
	if (typeof options.is_display_complete_time === 'undefined') options.is_display_complete_time = false;
	if (typeof options.is_check_osb === 'undefined') options.is_check_osb = true;
	if (typeof options.is_parse_sliders === 'undefined') options.is_parse_sliders = false;
	if (typeof options.is_print_progress === 'undefined') options.is_print_progress = true;


    console.assert(
        options.is_hit_objects_only_count == true && 
        osu_file_beatmap_properties.includes(osu_file_beatmap_property.hit_objects_count),
        'WARNING: hit_objects count will be null, set on "hit_objects_count" propery!')

    console.log('scan starting..');

	const songs = options.songs_folder;

    try{
        const osu_songs = path.join(osufolder, songs);
        
        const files = globSync( osu_songs + '/*/' , {
            absolute: false,
            cwd: osu_songs
        }) as string[];

        let count = 0;
        
        let beatmaps: beatmap_data[] = [];

        //display variables
        const one_percent_value = Math.trunc(files.length/100);
        display_progress_reset();

		const is_display_complete_time = typeof options.is_display_complete_time === 'undefined' ? true : options.is_display_complete_time;

        for (const beatmap_folder of files) {

            if ( existsSync(path.join(osu_songs, beatmap_folder)) && lstatSync(path.join(osu_songs, beatmap_folder)).isDirectory() ){

                let current_beatmaps = get_beatmaps_from_beatmap_folder(osufolder, beatmap_folder, osu_file_beatmap_properties, options);

                callback(current_beatmaps, beatmap_folder);

                if (options.is_read_only === false){
                    beatmaps = beatmaps.concat( current_beatmaps );
                } else {
                    current_beatmaps = [];
                }

            }

			if (  options.is_print_progress && count % one_percent_value == 0 ){
				display_progress({
					counter: count, 
					one_percent: one_percent_value, 
					length: files.length, 
					is_print_progress: options.is_print_progress,
					is_display_time: is_display_complete_time });
			}
            
            count ++;

        }

		console.log('');
		console.log('scan complete');
		
        return beatmaps;
    } catch (error) {
        console.log(error);
        throw new Error('Error scanning folder');
    }
        
}

export function get_beatmaps_from_beatmap_folder(osufolder:string, folder_path: string, 
    osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options): beatmap_data[] {

	const songs = options.songs_folder || 'Songs';
    const osu_songs = path.join(osufolder, songs);

    var beatmaps: beatmap_data[] = [];

	const is_check_osb = typeof options.is_check_osb === 'undefined' ? true : options.is_check_osb;

    try {
        const current_folder = path.join(osu_songs, folder_path);

        const beatmapset_files = globSync( current_folder + '/**/*' , { 
            absolute: false,
            cwd: current_folder
        }) as string[];
    
        if (beatmapset_files && beatmapset_files.length > 0) {

            for (const beatmapset_file of beatmapset_files) {
                
                if ( existsSync(path.join(current_folder, beatmapset_file)) && lstatSync(path.join(current_folder, beatmapset_file)).isDirectory() ) {
                    continue;
                }

                if (beatmapset_file.toLowerCase().endsWith(".osu") || 
                    (is_check_osb && beatmapset_file.toLowerCase().endsWith(".osb")) ) {
                        
                    const osu_file_path = path.join(osu_songs, folder_path, beatmapset_file);

                    const osu_file_data = parse_osu_file(osu_file_path, osu_file_beatmap_properties, options);

                    beatmaps.push(osu_file_data);

                }
            }

        }
        return beatmaps;

    } catch (error){
        console.log(error);
        throw new Error('Error open folder');
    }

    
}
