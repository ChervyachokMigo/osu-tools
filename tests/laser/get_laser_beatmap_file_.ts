import { all_osu_file_properties, beatmap_data, bpms, osu_file_beatmap_property } from '../../built/index.js';
import { open_realm, close_realm, get_laser_beatmap_file, set_laser_files_path, get_realm_objects } from '../../built/parsers/client_realm.js';

const realm_path = 'D:/osu!laser/client.realm';

const realm = open_realm(realm_path);

set_laser_files_path('D:\\osu!laser');

const beatmaps = get_realm_objects(realm, 'Beatmap');

const props:osu_file_beatmap_property[] = [
	osu_file_beatmap_property.total_time
];

const is_raw = false;

for (let i = 0 ; i < 1; i ++) {
	const random_beatmap = beatmaps[Math.round((beatmaps.length - 1) * Math.random())];

	//const beatmap = get_laser_beatmap_file((random_beatmap as any).Hash, is_raw, props, {is_hit_objects_only_count: false, }) as beatmap_data;

	 console.log(random_beatmap);
	//console.log(beatmap);
}

realm.close();
