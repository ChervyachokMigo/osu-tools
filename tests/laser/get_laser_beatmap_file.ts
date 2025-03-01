import { all_osu_file_properties, beatmap_data, bpms } from '../../built/index.js';
import { open_realm, close_realm, get_laser_beatmap_file, set_laser_files_path, get_realm_objects } from '../../built/parsers/client_realm.js';
import {v4, v5, v6, stringify} from 'uuid';

const realm_path = 'D:/osu!laser/client.realm';

const realm = open_realm(realm_path);

set_laser_files_path('D:\\osu!laser');

const beatmaps = get_realm_objects(realm, 'Beatmap').filter( (v:any) => v.Ruleset.OnlineID === 0);

console.log('beatmaps.length', beatmaps.length)
let i = 0;


while(i < 10 ) {
	const random_beatmap = beatmaps[Math.round((beatmaps.length - 1) * Math.random())];

	try {
	const is_raw = false;
	const beatmap = get_laser_beatmap_file((random_beatmap as any).Hash, is_raw, all_osu_file_properties, {is_hit_objects_only_count: false, }) as beatmap_data;

	if (beatmap.difficulty.stream_difficulty as number > 4) {
		console.log(
			'Beatmap Artist:', beatmap.metadata.artist, '\n',
			'Beatmap Title:', beatmap.metadata.title, '\n',
			'Version:', beatmap.metadata.version, '\n',
			'Hit objects count:', beatmap.hit_objects.count, '\n',
			'total_time', beatmap.general.total_time, '\n',
			'drain_time', beatmap.general.drain_time, '\n',
			'bpm.min', (beatmap.general.bpm as bpms).min, '\n',
			'bpm.max', (beatmap.general.bpm as bpms).max, '\n',
			'bpm.avg', (beatmap.general.bpm as bpms).avg, '\n',
			'stream_difficulty', beatmap.difficulty.stream_difficulty

		);
		


		i++;
	}
	} catch(e) {
		console.error('Error:', e);
		console.log(beatmaps.find( v => v.Hash === (random_beatmap as any).Hash));
	}

} 


realm.close();
