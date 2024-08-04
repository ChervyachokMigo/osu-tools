import * as osu_tools from '../built/index.js';
import * as path from 'path';
import { beatmap_property } from "../built/consts/property_settings";

console.time('complete');

const osu_path = 'D:/osu!';

const props: beatmap_property[] = [
    beatmap_property.beatmap_id,
    beatmap_property.beatmapset_id,
    beatmap_property.star_rating_std,
    beatmap_property.artist,
    beatmap_property.title,
    beatmap_property.creator,
    beatmap_property.difficulty,
    beatmap_property.gamemode,
    beatmap_property.ranked_status,
    beatmap_property.beatmap_md5,
]


const results = osu_tools.osu_db_load( path.join(osu_path, 'osu!.db'), props, {
	print_progress: true,
	print_progress_time: true
} );
//const founded_beatmaps = osu_tools.osu_db_find_beatmaps( results, (beatmap: any) =>  );

//console.log(results);

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );