import * as osu_tools from '../built/index.js';

const res = osu_tools.osu_db_load(
	'F:\\node_js_stuff\\node_projects\\osu-beatmaps-filter\\userdata\\livo4\\osu!.db', osu_tools.all_beatmap_properties);
osu_tools.osu_db_save(res, 'test.db');