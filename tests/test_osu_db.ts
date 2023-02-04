import * as osu_tools from '../built/index.js';
import * as path from 'path';
import { beatmap_property, all_beatmap_properties, all_score_properties, score_property, 
    osu_file_beatmap_property, all_osu_file_properties} from "../built/consts/property_settings";

console.time('complete');

const osu_path = 'E:/osu!';

//28.644s
const results = osu_tools.osu_db.load( path.join(osu_path, 'osu!.db'), all_beatmap_properties );
const founded_beatmaps = osu_tools.osu_db.find( results, (beatmap: any) =>  beatmap.beatmap_id && beatmap.beatmap_id < 100 );

console.log(founded_beatmaps);

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );