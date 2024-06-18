import path from "path";
import { osu_db_load } from "../parsers/osu_db";
import { all_beatmap_properties, beatmap_property } from "../consts/property_settings";
import { osu_db_save } from "./osu_db_saver";
import { db_filepath } from "../consts/db_filepath";
import { beatmap_results } from "../consts/beatmap_results";
import { StarRating } from "../consts/variable_types";

const sr_keys: any[] = Object.keys({star_rating_std: [], star_rating_taiko: [], star_rating_ctb: [], star_rating_mania: []} as beatmap_results);

const sr_props = [ 
	beatmap_property.beatmap_md5,
	beatmap_property.star_rating_std, 
	beatmap_property.star_rating_taiko,
	beatmap_property.star_rating_ctb, 
	beatmap_property.star_rating_mania
];

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
	const osu_db_2_result = osu_db_load( path.join(db_2.folder_path, db_2.filename), sr_props, { print_progress: true });

	console.log('[ comparing ]');


	for (let i = 0; i < result.beatmaps.length; i++){
		let beatmap = result.beatmaps[i];

		if (i % 1000 == 0) {
			console.log('compare', i, '/', result.beatmaps.length, `${(i/result.beatmaps.length*100).toFixed(2)}` ,'maps');
		}

		if ( !beatmap.beatmap_md5 || beatmap.beatmap_md5?.length !== 32) {
			continue;
		}

		const beatmap_2 = osu_db_2_result.beatmaps.find( v => v.beatmap_md5 === beatmap.beatmap_md5 );

		if (!beatmap_2) {
			continue;
		}

		type beatmap_key = keyof typeof beatmap;

		for (let sr of sr_keys) {
			const beatmap_sr = beatmap[sr as beatmap_key] as Array<StarRating>;
			const beatmap_2_sr = beatmap[sr as beatmap_key] as Array<StarRating>;

			if (beatmap_sr && beatmap_sr.length == 0 && beatmap_2_sr.length > 0)
				(beatmap[sr as beatmap_key] as Array<StarRating>) = beatmap_2_sr;
		}

		result.beatmaps[i] = beatmap;
	}

	return result;

}

export const osu_db_export_sr = ( db_1: db_filepath, output: string ) => {
	if (!db_1.filename) {
        db_1.filename = 'osu!.db';
    }

    console.log('[ loading db 1 ]');
    const result = osu_db_load( path.join(db_1.folder_path, db_1.filename), sr_props, { print_progress: true });

    if (result.beatmaps.length == 0) {
        console.log('db 1 is empty');
        return;
    }

    console.log('[ exporting ]');
	const export_data = [];
	for(let beatmap of result.beatmaps){
		if (!beatmap.beatmap_md5 || beatmap.beatmap_md5.length !== 32 ){
			continue;
		}

		const save_srs = [];
		for (let sr of sr_keys) {
            if (beatmap[sr as keyof typeof beatmap] && (beatmap[sr as keyof typeof beatmap] as StarRating[]).length == 0 ){
                continue;
			}

			save_srs.push([sr_keys.indexOf(sr), beatmap[sr as keyof typeof beatmap]])
        }

		export_data.push([beatmap.beatmap_md5, save_srs ])
	}

}