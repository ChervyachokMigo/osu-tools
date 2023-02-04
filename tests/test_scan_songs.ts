import * as osu_tools from '../built/index.js';
import * as path from 'path';
import { beatmap_property, all_beatmap_properties, all_score_properties, score_property, 
    osu_file_beatmap_property, all_osu_file_properties} from "../src/consts/property_settings";

import { beatmap_data } from "../src/consts/beatmap_data";
    

console.time('complete');

const osu_path = 'E:/osu!';

const needed_properties: osu_file_beatmap_property[] = [
    osu_file_beatmap_property.general_audio_filename,
    osu_file_beatmap_property.general_block,
    osu_file_beatmap_property.general_gamemode,
    osu_file_beatmap_property.difficulty_block,
    osu_file_beatmap_property.difficulty_Circle_Size,
    osu_file_beatmap_property.difficulty_Health_Points_drain_rate,
    osu_file_beatmap_property.difficulty_Overall_Difficulty,
    osu_file_beatmap_property.difficulty_Approach_Rate,
    osu_file_beatmap_property.hit_objects_block,
    osu_file_beatmap_property.timing_points_block,
    osu_file_beatmap_property.metadata_title,
    osu_file_beatmap_property.metadata_block,
    osu_file_beatmap_property.metadata_artist,
    osu_file_beatmap_property.metadata_beatmap_id,
    osu_file_beatmap_property.metadata_beatmapset_id,
    osu_file_beatmap_property.metadata_creator,
    osu_file_beatmap_property.metadata_source,
    osu_file_beatmap_property.metadata_tags,
    osu_file_beatmap_property.metadata_version,
]

osu_tools.songs.scan(osu_path, all_osu_file_properties, true, (beatmaps: beatmap_data[])=>{
    //console.log(beatmaps.length)
})

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );