import path from "path";
import { osu_db_load } from "../parsers/osu_db";
import { all_beatmap_properties, beatmap_property } from "../consts/property_settings";
import { osu_db_save } from "./osu_db_saver";
import { db_filepath } from "../consts/db_filepath";
import { beatmap_results } from "../consts/beatmap_results";
import { StarRating } from "../consts/variable_types";

const sr_keys: any[] = Object.keys({star_rating_std: [], star_rating_taiko: [], star_rating_ctb: [], star_rating_mania: []} as beatmap_results);

export const osu_db_concat_sr = ( db_1: db_filepath, db_2: db_filepath ) => {
	if (!db_1.filename) {
		db_1.filename = 'osu!.db';
	}

	if (!db_2.filename) {
        db_2.filename = 'osu!.db';
    }

	console.log('[ loading db 1 ]');
	const result = osu_db_load( path.join(db_1.folder_path, db_1.filename), all_beatmap_properties, { print_progress: true });

	if (result.beatmaps.length == 0) {
		console.log('db 1 is empty');
        return;
	}

	console.log('[ loading db 2 ]');
	const osu_db_2_result = osu_db_load( 
		path.join(db_2.folder_path, db_2.filename), [ 
			beatmap_property.beatmap_md5,
			beatmap_property.star_rating_std, 
			beatmap_property.star_rating_taiko,
			beatmap_property.star_rating_ctb, 
			beatmap_property.star_rating_mania], 
		{ print_progress: true });

	console.log('[ comparing ]');

	for (let i = 0; i < result.beatmaps.length; i++){
		if (i % 1000 == 0) {
			console.log('compare', i, '/', result.beatmaps.length, `${(i/result.beatmaps.length*100).toFixed(2)}` ,'maps');
		}

		if ( !result.beatmaps[i]?.beatmap_md5 || result?.beatmaps[i]?.beatmap_md5?.length !== 32) {
			continue;
		}

		const idx = osu_db_2_result.beatmaps.findIndex( v => v.beatmap_md5 === result.beatmaps[i].beatmap_md5 );

		if (idx == -1) {
			continue;
		}

		for (let sr of sr_keys) {
			if ((result.beatmaps[i] as beatmap_results[])[sr]  && ((result.beatmaps[i] as beatmap_results[])[sr] as StarRating[]).length == 0 ){

				if ( ((osu_db_2_result.beatmaps[idx] as beatmap_results[])[sr] as StarRating[]).length > 0) {

					(result.beatmaps[i] as beatmap_results[])[sr] = (osu_db_2_result.beatmaps[idx] as beatmap_results[])[sr];
				}
				
			}
		}
	}

	return result;

}