
import { find_beatmaps, osu_db_load } from './parsers/osu_db';
import { collection_db_load } from './parsers/collection_db';
import { scores_db_load } from './parsers/scores_db';
import { replay_load } from './parsers/replay_osr';

import { osu_db_results } from "./consts/osu_db_results";
import { collection_db_results } from "./consts/collection_db_results";

import { beatmap_property, all_beatmap_properties, all_score_properties, score_property, 
    osu_file_beatmap_property, all_osu_file_properties} from "./consts/property_settings";

import { get_collections_detailed, get_scores_detailed, get_score_detailed } from './tools/union';

import { beatmap_results } from './consts/beatmap_results';

import { get_all_beatmaps_from_songs } from './parsers/scan_songs';
import { appendFileSync, writeFileSync } from 'fs';

export { osu_db_results, collection_db_results, beatmap_results };

export const property = {
    beatmap: beatmap_property,
    score: score_property,
    osu_file: osu_file_beatmap_property,
}

export const all_properties = {
    beatmap: all_beatmap_properties,
    score: all_score_properties,
    osu_file: all_osu_file_properties
}

export const osu_db = {
    load: osu_db_load,
    find: find_beatmaps,
}

export const collection_db = {
    load: collection_db_load,
}

export const scores_db = {
    load: scores_db_load,
}

export const replay = {
    load: replay_load,
}

/*console.time('complete')

var getted_beatmap_properties = [
    beatmap_property.beatmap_id,
    beatmap_property.beatmap_stats,
    beatmap_property.beatmapset_id,
    beatmap_property.artist,
    beatmap_property.title,
    beatmap_property.creator,
    beatmap_property.difficulty,
    beatmap_property.beatmap_md5
];

var osu_db_result: osu_db_results = osu_db_load(
    'E:/osu!/osu!.db' , all_beatmap_properties
);


var founded_beatmaps = find_beatmaps( osu_db_result, (beatmap) =>  beatmap.beatmap_id && beatmap.beatmap_id < 100 );
console.log(founded_beatmaps);*/

/*var collection_db_result: collection_db_results = collection_db_load('E:/osu!/collection.db')

var detailed_collections = get_collections_detailed(collection_db_result, osu_db_result);
console.log(detailed_collections);


var scores_db_result = scores_db_load('E:/osu!/scores.db', [score_property.online_id, score_property.gamemode]);
console.log(scores_db_result);

var detailed_scores_db = get_scores_detailed(scores_db_result, osu_db_result);
console.log(detailed_scores_db);


/*var replay = replay_load(
    'E:\\osu!\\Replays\\replay-osu_3846701_4339861825.osr',
    all_score_properties);
console.log(replay);

var score_detailed = get_score_detailed(replay, osu_db_result);
console.log(score_detailed);*/


/*
//create collection db

var beatmaps = get_all_beatmaps_from_songs('E:\\osu!', all_osu_file_properties);
console.log('start writing all beatmaps '+beatmaps.length);

var count = 0;
var writing_beatmaps = [];
for (let beatmap of beatmaps){
    count ++;
    console.log('write '+count);
    writing_beatmaps.push(JSON.stringify(beatmap));
}

writeFileSync( "E:\\beatmaps_test.json", '['+writing_beatmaps.join(',')+']' );
*/


//console.timeEnd('complete')

//setTimeout(()=>{return true;}, 1000000);

