import * as osu_tools from '../built/index.js';

osu_tools.osu_db_load('osu!.db', osu_tools.all_beatmap_properties, { print_progress: true, verify: true });