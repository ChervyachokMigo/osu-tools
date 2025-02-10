import { open_realm, get_realm_objects } from '../built/index.js';
import { close_realm } from '../built/parsers/client_realm.js';

console.time('complete');

const realm_path = 'D:/osu!laser_test/client.realm';

const realm = open_realm(realm_path);

const beatmaps = get_realm_objects(realm, 'Beatmap');

//console.log(realm.schema);
console.log(beatmaps);

close_realm();

setTimeout( ()=>{ return true; }, 1000000 );