import { realm_beatmapset } from '../built/consts/laser/ream_beatmapset.js';
import { open_realm, get_realm_objects, close_realm, get_laser_beatmap_file, set_laser_files_path, export_beatmapset } from '../built/parsers/client_realm.js';

console.time('complete');

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

const beatmaps = get_realm_objects(realm, 'BeatmapSet');

//console.log(realm.schema);
//console.log(beatmaps);

//console.log(get_beatmap_file())
set_laser_files_path('D:\\osu!laser')
//const res = get_laser_beatmap_file('b456470b239a6537215eca18366c577c760d3e14e6735cabab7c311de5d55b3a', false);

const result = export_beatmapset(beatmaps, 1, 'D:\\laser_beatmapset_test');
console.log(result);

// for(let beatmap of beatmaps) {
// 	if (beatmap id)
// 	console.log(beatmap);
// 	console.log((beatmap as any).Files);
// 	break;
// }


close_realm();

//setTimeout( ()=>{ return true; }, 1000000 );