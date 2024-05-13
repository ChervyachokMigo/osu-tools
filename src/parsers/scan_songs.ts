import { existsSync, fstatSync, lstatSync, readFileSync } from "fs";

import path from "path";

import { beatmap_countdown, beatmap_data, 
    beatmap_data_hit_object, beatmap_overlay_position, 
    beatmap_sample_set, beatmap_timing_point, 
    hit_sample_set, beatmap_color_type, beatmap_data_hit_object_type, 
    beatmap_data_hit_sound, beatmap_data_hit_sample } from "../consts/beatmap_data";

import md5File from 'md5-file';

import { beatmap_block, beatmap_block_type_defaults, getBlockType } from "../consts/beatmap_block";

import { Gamemode } from "../consts/variable_types";

import bitwise from "bitwise";

import { all_difficulty_properties, all_editor_properties, 
    all_events_properties, all_general_properties, all_hit_objects_properties, all_metadata_properties, 
    osu_file_beatmap_property } from "../consts/property_settings";

import { event_string_parse } from "../tools/beatmap_events";
import { beatmap_event } from "../consts/beatmap_events/beatmap_event";

import { globSync, glob, Path } from "glob";

export type scanner_options = {
    is_read_only: boolean,
    is_hit_objects_only_count: boolean,
	songs_folder: string,
	is_display_complete_time: boolean,
	is_check_osb: boolean
}

export function songs_get_all_beatmaps ( 
	osufolder: string, osu_file_beatmap_properties: osu_file_beatmap_property[], 
    options: scanner_options, callback: Function): beatmap_data[] {

    console.assert(
        options.is_hit_objects_only_count == true && 
        osu_file_beatmap_properties.includes(osu_file_beatmap_property.hit_objects_count),
        'WARNING: hit_objects count will be null, set on "hit_objects_count" propery!')

    console.log('scan starting..');

	const songs = options.songs_folder || 'Songs';

    try{
        const osu_songs = path.join(osufolder, songs);
        
        const files = globSync( osu_songs + '/*/' , {
            absolute: false,
            cwd: osu_songs
        }) as string[];

        var count = 0;
        console.time('thousand')
        
        var beatmaps: beatmap_data[] = [];
        

        //display variables
        var one_percent_value = Math.trunc(files.length/100);
        var start_time = new Date().valueOf();
        var avg_times = [];

		const is_display_complete_time = typeof options.is_display_complete_time === 'undefined' ? true : options.is_display_complete_time;

        for (const beatmap_folder of files) {

            if (count % 1000 == 0){
                console.log(count, '/', files.length);
                console.timeEnd('thousand')

                console.time('thousand')
            }

            if ( existsSync(path.join(osu_songs, beatmap_folder)) && lstatSync(path.join(osu_songs, beatmap_folder)).isDirectory() ){

                let current_beatmaps = get_beatmaps_from_beatmap_folder(osufolder, beatmap_folder, osu_file_beatmap_properties, options);

                callback(current_beatmaps, beatmap_folder);

                if (options.is_read_only === false){
                    beatmaps = beatmaps.concat( current_beatmaps );
                } else {
                    current_beatmaps = [];
                }

            }

            //display progress
            if ( count % one_percent_value == 0 ){
                console.log(  ( ( count / files.length * 10000)/100).toFixed(1),'% complete');
				if (is_display_complete_time){
					let endtime = (new Date().valueOf()-start_time)*0.001;
					console.log('end for', endtime.toFixed(3) );
					start_time = new Date().valueOf();
					avg_times.push(endtime);
					console.log('avg_time', (avg_times.reduce((a, b) => a + b) / avg_times.length).toFixed(3) );
				}
            }
            
            count ++;

        }
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

export function parse_osu_file(osu_file_path: string, 
    osu_file_beatmap_properties: osu_file_beatmap_property[], options: scanner_options): beatmap_data {

    const properties_has_general_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.general_block);
    const properties_has_editor_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.editor_block);
    const properties_has_metadata_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.metadata_block);
    const properties_has_difficulty_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.difficulty_block);
    const properties_has_events_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.events_block);
    const properties_has_hit_objects_block =  osu_file_beatmap_properties.includes(osu_file_beatmap_property.hit_objects_block);

    const is_properties_has_general_block = properties_has_general_block || 
        all_general_properties.some(property => osu_file_beatmap_properties.includes(property));

    const is_properties_has_editor_block = properties_has_editor_block || 
        all_editor_properties.some(property => osu_file_beatmap_properties.includes(property));

    const is_properties_has_metadata_block = properties_has_metadata_block || 
        all_metadata_properties.some(property => osu_file_beatmap_properties.includes(property));

    const is_properties_has_difficulty_block = properties_has_difficulty_block || 
        all_difficulty_properties.some(property => osu_file_beatmap_properties.includes(property));

    const is_properties_has_events_block = properties_has_events_block || 
        all_events_properties.some(property => osu_file_beatmap_properties.includes(property));
    
    const is_properties_has_hit_objects_block = properties_has_hit_objects_block || 
        all_hit_objects_properties.some(property => osu_file_beatmap_properties.includes(property));


    const beatmap: beatmap_data = {
        general: {},
        editor: {},
        metadata: {},
        difficulty: {},
        events: [],
        timing_points: [],
        colors: [],
        hit_objects: {},
    }

    const filedata = readFileSync(osu_file_path, {encoding: 'utf-8'});

    const rows = filedata.split('\n')
        .filter((value:string) => value.length > 0 && !value.startsWith('//') );
    

    var beatmap_block_type: beatmap_block = Object.assign({}, beatmap_block_type_defaults);

    for (const row of rows){
        
        if (row.startsWith('[')){
            beatmap_block_type = getBlockType(row);
            continue;
        }

        //[General] block
        if (is_properties_has_general_block && beatmap_block_type.is_general_block ) {

            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name: string = row_splitted[0].toLowerCase().trim();
                let row_value: string = row_splitted[1].trim();

                if (typeof row_value !== 'undefined' && row_value.length > 0) {
                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_audio_filename) !== -1){
                        if (row_name.startsWith('audiofilename')){
                            beatmap.general.audio_filename = row_value;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_audio_lead_in) !== -1){
                        if (row_name.startsWith('audioleadin')){
                            beatmap.general.audio_lead_in = Number(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_audio_hash) !== -1){
                        if (row_name.startsWith('audiohash')){
                            beatmap.general.audio_hash = row_value;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_preview_time) !== -1){
                        if (row_name.startsWith('previewtime')){
                            beatmap.general.preview_time = Number(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_countdown) !== -1){
                        if (row_name.startsWith('countdown')){
                            beatmap.general.countdown = Number(row_value) as beatmap_countdown;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_sample_set) !== -1){
                        if (row_name.startsWith('sampleset')){
                            beatmap.general.sample_set = isNaN(Number(row_value)) ?
                                beatmap_sample_set[row_value as any] as unknown as beatmap_sample_set :
                                Number(row_value) as beatmap_sample_set;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_stack_leniency) !== -1){
                        if (row_name.startsWith('stackleniency')){
                            beatmap.general.stack_leniency = Number(row_value) ;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_gamemode) !== -1){
                        if (row_name.startsWith('mode')){
                            beatmap.general.gamemode = Number(row_value) as Gamemode ;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_letterbox_in_break) !== -1){
                        if (row_name.startsWith('letterboxinbreaks')){
                            beatmap.general.is_letterbox_in_break = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_storyfire_in_front) !== -1){
                        if (row_name.startsWith('storyfireinfront')){
                            beatmap.general.is_storyfire_in_front = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_use_skin_sprites) !== -1){
                        if (row_name.startsWith('useskinsprites')){
                            beatmap.general.is_use_skin_sprites = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_always_show_playfield) !== -1){
                        if (row_name.startsWith('alwaysshowplayfield')){
                            beatmap.general.is_always_show_playfield = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_overlay_position) !== -1){
                        if (row_name.startsWith('overlayposition')){
                            beatmap.general.overlay_position = isNaN(Number(row_value)) ?
                                beatmap_overlay_position[row_value as any] as unknown as beatmap_overlay_position :
                                Number(row_value) as beatmap_overlay_position;
                            
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_skin_preference) !== -1){
                        if (row_name.startsWith('skinpreference')){
                            beatmap.general.skin_preference = row_value;
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_epilepsy_warning) !== -1){
                        if (row_name.startsWith('epilepsywarning')){
                            beatmap.general.is_epilepsy_warning = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_countdown_offset) !== -1){
                        if (row_name.startsWith('countdownoffset')){
                            beatmap.general.countdown_offset = Number(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_special_style) !== -1){
                        if (row_name.startsWith('specialstyle')){
                            beatmap.general.is_special_style = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_widescreen_storyboard) !== -1){
                        if (row_name.startsWith('widescreenstoryboard')){
                            beatmap.general.is_widescreen_storyboard = Boolean(row_value);
                        }
                    }

                    if (properties_has_general_block ||
                        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_samples_match_playback_rate) !== -1){
                        if (row_name.startsWith('samplesmatchplaybackrate')){
                            beatmap.general.is_samples_match_playback_rate = Boolean(row_value);
                        }
                    }
                }

            }
        }
        
        //[Editor] block
        else if ( is_properties_has_editor_block && beatmap_block_type.is_editor_block) {

            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {

                let row_name: string = row_splitted[0].toLowerCase().trim();
                let row_value: string = row_splitted[1].trim();

                if (properties_has_editor_block ||
                    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.editor_bookmarks) !== -1){
                    if (row_name.startsWith('bookmarks')){
                        beatmap.editor.bookmarks = row_value.split(',')
                            .map(value => Number(value.trim()) )
                            .filter(value => !isNaN(value) && value > 0 );
                    }
                }

                if (properties_has_editor_block ||
                    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.editor_distance_snapping) !== -1){
                    if (row_name.startsWith('distancespacing')){
                        beatmap.editor.distance_snapping = Number(row_value);
                    }
                }

                if (properties_has_editor_block ||
                    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.editor_beat_divisor) !== -1){
                    if (row_name.startsWith('beatdivisor')){
                        beatmap.editor.beat_divisor = Number(row_value);
                    }
                }

                if (properties_has_editor_block ||
                    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.editor_grid_size) !== -1){
                    if (row_name.startsWith('gridsize')){
                        beatmap.editor.grid_size = Number(row_value);
                    }
                }

                if (properties_has_editor_block ||
                    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.editor_timeline_zoom) !== -1){
                    if (row_name.startsWith('timelinezoom')){
                        beatmap.editor.timeline_zoom = Number(row_value);
                    }
                }

            }
        }
        
        //[Metadata] block
        else if (is_properties_has_metadata_block && beatmap_block_type.is_metadata_block) {

            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {

                let row_name: string = row_splitted[0].toLowerCase().trim();
                let row_value: string = row_splitted[1].trim();

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_title) !== -1){
                    if (row_name === 'title'){
                        beatmap.metadata.title = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_title_unicode) !== -1){
                    if (row_name === 'titleunicode'){
                        beatmap.metadata.title_unicode = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_artist) !== -1){
                    if (row_name === 'artist'){
                        beatmap.metadata.artist = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_artist_unicode) !== -1){
                    if (row_name === 'artistunicode'){
                        beatmap.metadata.artist_unicode = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_creator) !== -1){
                    if (row_name.startsWith('creator')){
                        beatmap.metadata.creator = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_version) !== -1){
                    if (row_name.startsWith('version')){
                        beatmap.metadata.version = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_source) !== -1){
                    if (row_name.startsWith('source')){
                        beatmap.metadata.source = row_value;
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_tags) !== -1){
                    if (row_name.startsWith('tags')){
                        beatmap.metadata.tags = row_value.split(' ')
                        .filter( value => value.length>0 );
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_beatmap_id) !== -1){
                    if (row_name.startsWith('beatmapid')){
                        beatmap.metadata.beatmap_id = Number(row_value);
                    }
                }

                if (properties_has_metadata_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.metadata_beatmapset_id) !== -1){
                    if (row_name.startsWith('beatmapsetid')){
                        beatmap.metadata.beatmapset_id = Number(row_value);
                    }
                }

            }
        }

        //[Difficulty] block
        else if (is_properties_has_difficulty_block && beatmap_block_type.is_difficulty_block) {

            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name: string = row_splitted[0].toLowerCase().trim();
                let row_value: string = row_splitted[1].trim();

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_Health_Points_drain_rate) !== -1){
                    if (row_name.startsWith('hpdrainrate')){
                        beatmap.difficulty.Health_Points_drain_rate = Number(row_value);
                    }
                }

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_Circle_Size) !== -1){
                    if (row_name.startsWith('circlesize')){
                        beatmap.difficulty.Circle_Size = Number(row_value);
                    }
                }

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_Overall_Difficulty) !== -1){
                    if (row_name.startsWith('overalldifficulty')){
                        beatmap.difficulty.Overall_Difficulty = Number(row_value);
                    }
                }

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_Approach_Rate) !== -1){
                    if (row_name.startsWith('approachrate')){
                        beatmap.difficulty.Approach_Rate = Number(row_value);
                    }
                }

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_slider_multiplier) !== -1){
                    if (row_name.startsWith('slidermultiplier')){
                        beatmap.difficulty.slider_multiplier = Number(row_value);
                    }
                }

                if (properties_has_difficulty_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.difficulty_slider_tick_rate) !== -1){
                    if (row_name.startsWith('slidertickrate')){
                        beatmap.difficulty.slider_tick_rate = Number(row_value);
                    }
                }

            }
        }

        //[Events] block
        else if (is_properties_has_events_block && beatmap_block_type.is_event_block) {

            let row_escaped = row.replace('\r', '')

            if (row_escaped.length >= 1) {

                let current_event = event_string_parse( row_escaped , osu_file_beatmap_properties );

                if (current_event) beatmap.events.push( current_event as beatmap_event );

            }
        }

        //[TimingPoints] block
        else if (osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.timing_points_block) !== -1 &&
            beatmap_block_type.is_timing_points_block) {

            let row_splitted = row.replace('\r', '').split(',');
            if (row_splitted.length >= 2) {
                let timing_point: beatmap_timing_point = {
                    time_offset: Number(row_splitted[0]),
                    beat_length: Number(row_splitted[1]),
                    meter: row_splitted[2]?Number(row_splitted[2]):0,
                    sample_set: row_splitted[3]?Number(row_splitted[3]) as hit_sample_set:0,
                    sample_index: row_splitted[4]?Number(row_splitted[4]):0,
                    volume: row_splitted[5]?Number(row_splitted[5]):0,
                    uninherited: row_splitted[6]?Boolean(row_splitted[6]):false,
                    effects: {
                        is_kiai: row_splitted[7]?Boolean(bitwise.integer.getBit(Number(row_splitted[7]), 0)):false,
                        is_first_barline: row_splitted[7]?Boolean(bitwise.integer.getBit(Number(row_splitted[7]), 3)):false,
                    }

                };
                beatmap.timing_points.push(timing_point);     
            }

        }

        //[Colours] block
        else if (osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.colors_block) !== -1 &&
        beatmap_block_type.is_color_block) {

            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name: string = row_splitted[0].toLowerCase().trim();
                let row_value: string = row_splitted[1].trim();

                if (row_name.startsWith('color') ||
                 row_name.startsWith('slidertrackoverride') ||
                 row_name.startsWith('sliderborder')){
                    let color_type = beatmap_color_type[row_name as keyof typeof beatmap_color_type];
                    let colors_components = row_value.split(',').map(value => value.trim() );
                    let color = {
                        type: color_type, 
                        red: Number(colors_components[0]),
                        green: Number(colors_components[1]),
                        blue: Number(colors_components[2])
                    };
                    beatmap.colors.push(color); 
                }
            }

        }

        //[HitObjects] block
        else if (is_properties_has_hit_objects_block && beatmap_block_type.is_hit_objects_block) {

            let row_splitted = row.replace('\r', '').split(',');

            if (properties_has_hit_objects_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.hit_objects_count) !== -1){
                
                beatmap.hit_objects.count = row_splitted.filter( value => value.length >=5 ).length;

            }

            if ( options.is_hit_objects_only_count === false && 
                (properties_has_hit_objects_block ||
                osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.hit_objects) !== -1)) {
                
                if (row_splitted.length >= 5) {
                    let type = 0;
                    if (bitwise.integer.getBit(Number(row_splitted[3]), 0) == 1){
                        type = beatmap_data_hit_object_type.hitcircle;
                    }
                    if (bitwise.integer.getBit(Number(row_splitted[3]), 1) == 1){
                        type = beatmap_data_hit_object_type.slider;
                    }
                    if (bitwise.integer.getBit(Number(row_splitted[3]), 3) == 1){
                        type = beatmap_data_hit_object_type.spinner;
                    }
                    if (bitwise.integer.getBit(Number(row_splitted[3]), 7) == 1){
                        type = beatmap_data_hit_object_type.mania_hold;
                    }

                    let hit_sample: beatmap_data_hit_sample = {};
                    let hit_sample_row = row_splitted.pop();
                    if (hit_sample_row){
                        if ( hit_sample_row.length>=5 ){
                            let hit_sample_splitted = hit_sample_row.split(':');
                            hit_sample.normal_set = Number(hit_sample_splitted[0]) as hit_sample_set;
                            hit_sample.addition_set = Number(hit_sample_splitted[1]) as hit_sample_set;
                            hit_sample.index = Number(hit_sample_splitted[2]);
                            hit_sample.volume = Number(hit_sample_splitted[3]);
                            hit_sample.filename = hit_sample_splitted[4];
                        } else {
                            row_splitted.push (hit_sample_row);
                        }
                    }                

                    let is_new_combo = Boolean(bitwise.integer.getBit(Number(row_splitted[3]), 2) );
                    let hit_object: beatmap_data_hit_object = {
                        x: Number(row_splitted[0]),
                        y: Number(row_splitted[1]),
                        time: Number(row_splitted[2]),
                        type: type as beatmap_data_hit_object_type,

                        is_new_combo: is_new_combo,

                        hit_sound: Number(row_splitted[4]) as beatmap_data_hit_sound,
                        object_params: row_splitted.slice(5).join(','),
                        hit_sample: hit_sample

                        
                    }
                    
                    if (is_new_combo){
                        let skip_colors_bits = [
                            Number(bitwise.integer.getBit(Number(row_splitted[3]), 4)),
                            Number(bitwise.integer.getBit(Number(row_splitted[3]), 5)),
                            Number(bitwise.integer.getBit(Number(row_splitted[3]), 6))
                        ];
                        hit_object.new_combo_colors_skip = parseInt(
                            `${skip_colors_bits[0]}${skip_colors_bits[1]}${skip_colors_bits[2]}`, 2);
                    }

                    if (typeof beatmap.hit_objects.hit_objects  === 'undefined'){
                        beatmap.hit_objects.hit_objects = [];
                    }

                    beatmap.hit_objects.hit_objects.push(hit_object);

                }
            }
        }

    
    //end for loop
    }

    //set defaults
    //[General] block
    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_audio_lead_in) !== -1){
        if (beatmap.general.audio_lead_in === undefined){
            beatmap.general.audio_lead_in = 0;    
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_preview_time) !== -1){         
        if (beatmap.general.preview_time === undefined){
            beatmap.general.preview_time = -1;    
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_countdown) !== -1){
        if (beatmap.general.countdown === undefined){
            beatmap.general.countdown = beatmap_countdown.normal;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_sample_set) !== -1){
        if (beatmap.general.sample_set === undefined){
            beatmap.general.sample_set = beatmap_sample_set.Normal;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_stack_leniency) !== -1){
        if (beatmap.general.stack_leniency === undefined){
            beatmap.general.stack_leniency = 0.7;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_gamemode) !== -1){
        if (beatmap.general.gamemode === undefined){
            beatmap.general.gamemode = Gamemode.osu;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_letterbox_in_break) !== -1){
        if (beatmap.general.is_letterbox_in_break === undefined){
            beatmap.general.is_letterbox_in_break = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_storyfire_in_front) !== -1){
        if (beatmap.general.is_storyfire_in_front === undefined){
            beatmap.general.is_storyfire_in_front = true;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_use_skin_sprites) !== -1){
        if (beatmap.general.is_use_skin_sprites === undefined){
            beatmap.general.is_use_skin_sprites = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_always_show_playfield) !== -1){
        if (beatmap.general.is_always_show_playfield === undefined){
            beatmap.general.is_always_show_playfield = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_overlay_position) !== -1){
        if (beatmap.general.overlay_position === undefined){
            beatmap.general.overlay_position = beatmap_overlay_position.NoChange;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_epilepsy_warning) !== -1){
        if (beatmap.general.is_epilepsy_warning === undefined){
            beatmap.general.is_epilepsy_warning = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_countdown_offset) !== -1){
        if (beatmap.general.countdown_offset === undefined){
            beatmap.general.countdown_offset = 0;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_special_style) !== -1){
        if (beatmap.general.is_special_style === undefined){
            beatmap.general.is_special_style = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_widescreen_storyboard) !== -1){
        if (beatmap.general.is_widescreen_storyboard === undefined){
            beatmap.general.is_widescreen_storyboard = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_is_samples_match_playback_rate) !== -1){
        if (beatmap.general.is_samples_match_playback_rate === undefined){
            beatmap.general.is_samples_match_playback_rate = false;
        }
    }

    if (properties_has_general_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.general_beatmap_filename) !== -1){
            if (!beatmap.general)
                beatmap.general = {};
            beatmap.general.beatmap_filename = path.basename(osu_file_path);
    }

    if (properties_has_metadata_block ||
        osu_file_beatmap_properties.indexOf (osu_file_beatmap_property.metadata_beatmap_md5) !== -1 ){
        if (!beatmap.metadata)
            beatmap.metadata = {};
            beatmap.metadata.beatmap_md5 = md5File.sync(osu_file_path);
    }

    for (let key in beatmap) {
        if (Array.isArray(beatmap[key as keyof beatmap_data]) && (beatmap[key as keyof beatmap_data] as any[]).length === 0) {
            delete beatmap[key as keyof beatmap_data];
        } else if (typeof beatmap[key as keyof beatmap_data] === 'object' && Object.keys(beatmap[key as keyof beatmap_data]).length === 0) {
            delete beatmap[key as keyof beatmap_data];
        }
    }

    return beatmap;
}

