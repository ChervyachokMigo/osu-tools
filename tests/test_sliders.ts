import * as osu_tools from '../built/index.js';
import * as path from 'path';
import { beatmap_property, all_beatmap_properties, all_score_properties, score_property, 
    osu_file_beatmap_property, all_osu_file_properties} from "../built/consts/property_settings";

console.time('complete');

const osu_path = 'D:/osu!';

const results = osu_tools.songs_get_all_beatmaps( osu_path, 
	[osu_file_beatmap_property.hit_objects, osu_file_beatmap_property.metadata_beatmap_md5], 
	{is_hit_objects_only_count: false, is_check_osb: false, is_parse_sliders: true}, (beatmaps: any, folder: any) => {
		//console.log(beatmaps);
	});


setTimeout( ()=>{ return true; }, 1000000 );