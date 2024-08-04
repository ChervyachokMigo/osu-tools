import * as osu_tools from '../built/index.js';

const res = osu_tools.osu_db_load('D:\\osu!\\osu!.db', osu_tools.all_beatmap_properties, {
	print_progress: true,
	print_progress_time: true
});

osu_tools.osu_db_save(res, 'test.db',  {
	print_progress: true,
	print_progress_time: true,
});