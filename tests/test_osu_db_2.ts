import * as osu_tools from '../built/index.js';
import * as path from 'path';
import { beatmap_property, all_beatmap_properties, all_score_properties, score_property, 
    osu_file_beatmap_property, all_osu_file_properties} from "../built/consts/property_settings";
import { writeFileSync } from 'fs';

console.time('complete');

const osu_path = 'D:/osu!';

const bps:beatmap_property[] = [
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


const results = osu_tools.osu_db_load( path.join(osu_path, 'osu!.db'), bps );
//const founded_beatmaps = osu_tools.osu_db_find_beatmaps( results, (beatmap: any) =>  );

//console.log(results);

console.timeEnd('complete');

writeFileSync( 'osu.db.json', JSON.stringify(results), {encoding: 'utf8'})

setTimeout( ()=>{ return true; }, 1000000 );