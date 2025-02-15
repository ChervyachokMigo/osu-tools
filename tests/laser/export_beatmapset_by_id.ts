import { open_realm, get_realm_objects, close_realm, set_laser_files_path, export_beatmapset } from '../../built/parsers/client_realm.js';

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

const beatmapsets = get_realm_objects(realm, 'BeatmapSet');

set_laser_files_path('D:\\osu!laser')

const result = export_beatmapset(beatmapsets, 1, 'D:\\laser_beatmapset_test');
console.log(result);

close_realm();
