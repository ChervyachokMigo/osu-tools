import * as osu_tools from '../src/index';

import { osu_file_beatmap_property, all_osu_file_properties} from "../src/consts/property_settings";

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
];

const events_props: osu_file_beatmap_property[] = [
    osu_file_beatmap_property.metadata_beatmap_md5,
    osu_file_beatmap_property.metadata_beatmap_id,
    osu_file_beatmap_property.metadata_beatmapset_id,
    osu_file_beatmap_property.metadata_title,
    osu_file_beatmap_property.metadata_artist,
    osu_file_beatmap_property.general_gamemode,
];

console.time('complete');

const osu_path = 'D:/osu!';

osu_tools.songs_get_all_beatmaps(osu_path, needed_properties, {
	is_print_progress: true, 
	is_display_complete_time: true}, () => {});

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );