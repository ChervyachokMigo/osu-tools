import * as osu_tools from '../built/index.js';
import * as path from 'path';

console.time('complete');

const osu_path = 'E:/osu!';

const results = osu_tools.osu_db.load( path.join(osu_path, 'osu!.db'), osu_tools.all_properties.beatmap);
const founded_beatmaps = osu_tools.osu_db.find( results, (beatmap: any) =>  beatmap.beatmap_id && beatmap.beatmap_id < 100 );

console.log(founded_beatmaps);

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );