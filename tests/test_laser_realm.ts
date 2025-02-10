import { open_realm, get_realm_objects, close_realm, get_beatmap_file, set_laser_files_path } from '../built/parsers/client_realm.js';

console.time('complete');

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

const beatmaps = get_realm_objects(realm, 'Beatmap');

//console.log(realm.schema);
console.log(beatmaps);

//console.log(get_beatmap_file())
set_laser_files_path('D:\\osu!laser')
const res = get_beatmap_file('b456470b239a6537215eca18366c577c760d3e14e6735cabab7c311de5d55b3a', false);

console.log(res);

close_realm();

setTimeout( ()=>{ return true; }, 1000000 );