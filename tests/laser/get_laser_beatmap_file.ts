import { all_osu_file_properties } from '../../built/index.js';
import { open_realm, close_realm, get_laser_beatmap_file, set_laser_files_path, get_realm_objects } from '../../built/parsers/client_realm.js';

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

set_laser_files_path('D:\\osu!laser');

const beatmaps = get_realm_objects(realm, 'Beatmap');

const random_beatmap = beatmaps[Math.round((beatmaps.length - 1) * Math.random())];

console.log(random_beatmap);

const is_raw = false;
const res = get_laser_beatmap_file((random_beatmap as any).Hash, is_raw, all_osu_file_properties, {is_hit_objects_only_count: false});

console.log(res);

realm.close();
