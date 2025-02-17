import { open_realm, get_realm_objects, close_realm, set_laser_files_path, find_beatmapset_files } from '../../built/parsers/client_realm';

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

const beatmaps = get_realm_objects(realm, 'BeatmapSet');

set_laser_files_path('D:\\osu!laser');

console.log(find_beatmapset_files(beatmaps, 1))

close_realm();
