
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

export const all_properties = {
    beatmap: all_beatmap_properties,
    score: all_score_properties,
    osu_file: all_osu_file_properties
}

export const songs = {
    scan: get_all_beatmaps_from_songs
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

