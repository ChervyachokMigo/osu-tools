import { existsSync } from 'fs';
import { all_osu_file_properties, beatmap_data, bpms } from '../../built/index.js';
import { open_realm, close_realm, get_laser_beatmap_file, set_laser_files_path, get_realm_objects, get_laser_beatmap_file_path } from '../../built/parsers/client_realm.js';

const realm_path = 'D:/osu!laser/client.realm';

const realm = open_realm(realm_path);

set_laser_files_path('D:\\osu!laser');

const beatmaps = get_realm_objects(realm, 'Beatmap');

console.log('beatmaps.length', beatmaps.length)
let i = 0;
let percent = Math.floor(beatmaps.length / 20);
for (let beatmap of beatmaps) {
	const filepath = get_laser_beatmap_file_path(beatmap.Hash as string);
	if (!existsSync(filepath)) {
		console.log((beatmap.BeatmapSet as any).OnlineID);
		console.log((beatmap.BeatmapSet as any));
	}
	
	if (i % percent == 0) {
		console.log(i/percent, '%');
	}
	i++;
}



realm.close();

console.log('complete')