import path from "path";
import { osu_db_load } from "../parsers/osu_db";
import { all_beatmap_properties, beatmap_property } from "../consts/property_settings";
import { osu_db_save } from "./osu_db_saver";
import { db_filepath } from "../consts/db_filepath";
import { beatmap_results } from "../consts/beatmap_results";
import { StarRating } from "../consts/variable_types";
import { osu_db_results } from "../consts/osu_db_results";
import { buffer_saver } from "./buffer_saver";
import { writeFileSync } from "fs";
import { raw_file } from "../parsers/raw_file";
import { display_progress, display_progress_reset } from "./display_progress";
import { beatmap_star_ratings, sr_raw_result, star_ratings } from "../consts/star_ratings";

const sr_keys: any[] = Object.keys({star_rating_std: [], star_rating_taiko: [], star_rating_ctb: [], star_rating_mania: []} as beatmap_results);


const sr_props = [ 
	beatmap_property.beatmap_md5,
	beatmap_property.star_rating_std, 
	beatmap_property.star_rating_taiko,
	beatmap_property.star_rating_ctb, 
	beatmap_property.star_rating_mania
];

export const osu_db_concat_sr = ( db_1: db_filepath, db_2: db_filepath ): osu_db_results => {
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
        return result;
	}

	console.log('[ loading db 2 ]');
	const osu_db_2_result = osu_db_load( path.join(db_2.folder_path, db_2.filename), sr_props, { print_progress: true });

	console.log('[ comparing ]');
	display_progress_reset();
	const one_percent_value = Math.trunc(result.beatmaps.length/100);

	for (let i = 0; i < result.beatmaps.length; i++){
		let beatmap = result.beatmaps[i];

		if ( i % one_percent_value == 0 ){
			display_progress({ 
				counter: i, 
				length: result.beatmaps.length, 
				one_percent: one_percent_value,
				is_display_time: false,
				is_print_progress: true });
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

		let is_changed = false;

		for (let sr of sr_keys) {
			const beatmap_sr = beatmap[sr as beatmap_key] as Array<StarRating>;
			const beatmap_2_sr = beatmap_2[sr as beatmap_key] as Array<StarRating>;

			if (beatmap_sr && beatmap_sr.length == 0 && beatmap_2_sr.length > 0) {
                (beatmap[sr as beatmap_key] as Array<StarRating>) = beatmap_2_sr;
				is_changed = true;
			}
		}

		if (is_changed)
			result.beatmaps[i] = beatmap;
	}

	return result;

}

export const save_sr = (version: number, data: beatmap_star_ratings[], output: string) => {
	let buffer = new buffer_saver();
	buffer.addInt(version);
	buffer.addInt(data.length);
	for (let beatmap of data) {
		buffer.addString(beatmap.beatmap_md5);
        buffer.addByte(Object.keys(beatmap.star_ratings).length);
		for (let x of Object.entries(beatmap.star_ratings)){
			buffer.addByte(sr_keys.indexOf(x[0]));
			if (version as number < 20250107) {
				buffer.addStarRatings_double(x[1]);
			} else {
				buffer.addStarRatings_float(x[1]);
			}
		}
	}

	writeFileSync(output, buffer.getBuffer(), { encoding: 'binary'});
}

export const osu_db_export_sr = ( input_db: db_filepath, output_raw: string ) => {
	if (!input_db.filename) {
        input_db.filename = 'osu!.db';
    }

    console.log('[ loading db 1 ]');
    const osu_db = osu_db_load( path.join(input_db.folder_path, input_db.filename), sr_props, { print_progress: true });

    if (osu_db.beatmaps.length == 0) {
        console.log('db 1 is empty');
        return;
    }

    console.log('[ exporting ]');

	const srs: beatmap_star_ratings[] = [];

	for(let beatmap of osu_db.beatmaps){
		if (!beatmap.beatmap_md5 || beatmap.beatmap_md5.length !== 32 ){
			continue;
		}
		
		const save_srs: star_ratings = {};

		for (let sr of sr_keys) {
            if (beatmap[sr as keyof typeof beatmap] && (beatmap[sr as keyof typeof beatmap] as StarRating[]).length == 0 ){
                continue;
			}

			save_srs[sr as keyof typeof save_srs] = beatmap[sr as keyof typeof beatmap] as StarRating[];
        }
		

		if (Object.keys(save_srs).length == 0) {
            continue;
        }

		srs.push({ beatmap_md5: beatmap.beatmap_md5, star_ratings: save_srs });
	}

	save_sr(osu_db.osu_version as number, srs, output_raw);
}

export const load_sr = ( raw_path: string ): sr_raw_result => {
	const results: beatmap_star_ratings[] = [];

	console.log('[ loading raw data ]');
	const file = new raw_file(raw_path);

	const version = file.buff.getInt();
	const beatmaps_length = file.buff.getInt();
	for (let i = 0; i < beatmaps_length; i++) {
		if (i % 1000 == 0) {
			process.stdout.write(`loading ${i}/${beatmaps_length} (${(i/beatmaps_length*100).toFixed(2)}%)\r`);
		}
		const beatmap: beatmap_star_ratings = {
			beatmap_md5: file.buff.getString(),
            star_ratings: {}
		}
        const star_ratings_length = file.buff.getByte();
		for (let j = 0; j < star_ratings_length; j++) {
			const star_rating_key = sr_keys[file.buff.getByte()];
			if (version as number < 20250107) {
				const star_ratings = file.buff.getStarRatings_double();
				beatmap.star_ratings[star_rating_key as keyof star_ratings] = star_ratings;
			} else {
				const star_ratings = file.buff.getStarRatings_float();
				beatmap.star_ratings[star_rating_key as keyof star_ratings] = star_ratings;
			}
            
        }
		results.push(beatmap);
	}

	file.close();

	return { version, beatmaps: results };
}

export const osu_db_import_sr = ( input_raw: sr_raw_result, osu_db: osu_db_results, output_db: db_filepath ) => {
	
	if (!output_db.filename) {
        output_db.filename = 'osu!.db';
    }

    if (osu_db.beatmaps.length == 0) {
        console.log('db is empty');
        return;
    }

	osu_db.osu_version = input_raw.version;

	console.log('[ comparing ]');

	const sr_set = new Set(input_raw.beatmaps.map( x => x.beatmap_md5 ));

	type beatmap_keys = (keyof beatmap_results)[];

	for (let i = 0; i < osu_db.beatmaps.length; i++){
		if (i % 1000 == 0) {
			process.stdout.write(`compare ${i}/${osu_db.beatmaps.length} (${(i/osu_db.beatmaps.length*100).toFixed(2)}%)\r`);
		}

		if (!sr_set.has( osu_db.beatmaps[i].beatmap_md5 as string )) {
			continue;
		}

		if ( !osu_db.beatmaps[i].beatmap_md5 || osu_db.beatmaps[i].beatmap_md5?.length !== 32) {
			continue;
		}

		const idx = input_raw.beatmaps.findIndex( v => v.beatmap_md5 === osu_db.beatmaps[i].beatmap_md5 );

		for (let sr of sr_keys as beatmap_keys) {
			if (!input_raw.beatmaps[idx].star_ratings[sr as keyof star_ratings] ) {
                continue;
            }
            (osu_db.beatmaps[i][sr] as StarRating[]) = input_raw.beatmaps[idx].star_ratings[sr as keyof star_ratings] as StarRating[];
		}

	}

	console.log('[ saving ]');
	osu_db_save(osu_db, path.join(output_db.folder_path, output_db.filename), {print_progress: true});
}