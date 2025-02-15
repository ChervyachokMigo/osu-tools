import { open_realm, close_realm, get_laser_beatmap_file, set_laser_files_path } from '../../built/parsers/client_realm.js';

const realm_path = 'D:/osu!laser_test/client.realm';

open_realm(realm_path);

set_laser_files_path('D:\\osu!laser');

const is_raw = true;
const res = get_laser_beatmap_file('b456470b239a6537215eca18366c577c760d3e14e6735cabab7c311de5d55b3a', is_raw);

console.log(res);

close_realm();
