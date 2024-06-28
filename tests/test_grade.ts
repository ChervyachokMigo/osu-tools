import * as osu_tools from '../built/index.js';
/*
const osu_db_path = "D:\\osu!\\osu!.db";

const osu_db_data = osu_tools.osu_db_load(osu_db_path, osu_tools.all_beatmap_properties);

const exclude_grades = [1,2, 3,4,5, 6, 7 ]

osu_db_data.beatmaps.forEach( x => {
	const grades = {
		std: x.grade_achieved_std , taiko: x.grade_achieved_taiko, ctb: x.grade_achieved_ctb, mania: x.grade_achieved_mania
	}
	
	if (grades.std === 9 && grades.taiko === 9 && grades.ctb === 9 && grades.mania === 9) {
		return;
	}

	if (Object.values(grades).findIndex( y => exclude_grades.indexOf(y as number) > -1) > -1) {
		return;
	}

	console.log(x.beatmap_id, x.grade_achieved_std, x.grade_achieved_taiko, x.grade_achieved_ctb, x.grade_achieved_mania )
});

*/

const score_results = osu_tools.scores_db_load("D:\\osu!\\scores.db", osu_tools.all_score_properties);

score_results.beatmaps_scores.forEach( x => {
	x.scores.forEach( y => {
		console.log('grade', osu_tools.get_score_grade(y))
	})
})