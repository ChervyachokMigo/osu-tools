import { writeFileSync } from "fs";
import { buffer_saver } from "./buffer_saver";
import { osu_db_results } from "../consts/osu_db_results";
import { StarRating, TimingPoint } from "../consts/variable_types";


export const osu_db_save = ( osu_db: osu_db_results, file_path: string = 'osu!.db', options: {print_progress: boolean} ) => {
    let buffer = new buffer_saver();

    buffer.addInt(osu_db.osu_version as number);
    buffer.addInt(osu_db.folder_count as number);
	buffer.addBool(osu_db.is_account_unlocked as boolean);
	buffer.addWindowTickrateFromDate(osu_db.account_unlocked_date as Date);
	buffer.addString(osu_db.playername as Buffer);

	if(osu_db.number_beatmaps !== osu_db.beatmaps.length ){
		osu_db.number_beatmaps = osu_db.beatmaps.length;
		console.error('osu_db.number_beatmaps is not equals osu_db.beatmaps.length');
	}
	
	//display variables
	const one_percent_value = Math.trunc(osu_db.number_beatmaps/100);
	let start_time = new Date().valueOf();
	let avg_times = [];

	buffer.addInt(osu_db.number_beatmaps as number);

	for ( let i = 0; i < osu_db.number_beatmaps; i++ ) {

		//display progress
		if ( options.print_progress && i % one_percent_value == 0){
			console.log(  ( ( i / osu_db.number_beatmaps * 10000)/100).toFixed(1),'% complete');
			let endtime = (new Date().valueOf()-start_time)*0.001;
			console.log('end for', endtime.toFixed(3) );
			start_time = new Date().valueOf();
			avg_times.push(endtime);
			console.log('avg_time', (avg_times.reduce((a, b) => a + b) / avg_times.length).toFixed(3) );
		}

		const beatmap = osu_db.beatmaps[i];

		if (osu_db.osu_version as number < 20191106) {
			buffer.addInt(beatmap.beatmap_size as number);
		}

		buffer.addString(beatmap.artist as string);
		buffer.addString(beatmap.artist_unicode as string);
		buffer.addString(beatmap.title as string);
		buffer.addString(beatmap.title_unicode as string);
		buffer.addString(beatmap.creator as string);
		buffer.addString(beatmap.difficulty as string);
		buffer.addString(beatmap.audio_filename as string);
		buffer.addString(beatmap.beatmap_md5 as string);
		buffer.addString(beatmap.osu_filename as string);
		buffer.addByte(beatmap.ranked_status_int as number);
		buffer.addShort(beatmap.number_hitcircles as number);
		buffer.addShort(beatmap.number_sliders as number);
		buffer.addShort(beatmap.number_spinners as number);
		buffer.addWindowTickrateFromDate(beatmap.mod_date as Date);

		if (osu_db.osu_version as number < 20140609) {
			buffer.addByte(beatmap.AR as number);
            buffer.addByte(beatmap.CS as number);
            buffer.addByte(beatmap.HP as number);
            buffer.addByte(beatmap.OD as number);
		} else {
			buffer.addSingle(beatmap.AR as number);
            buffer.addSingle(beatmap.CS as number);
            buffer.addSingle(beatmap.HP as number);
            buffer.addSingle(beatmap.OD as number);
		}

		buffer.addDouble(beatmap.slider_velocity as number);

		if (osu_db.osu_version as number >= 20140609) {
			buffer.addStarRatings(beatmap.star_rating_std as StarRating[]);
			buffer.addStarRatings(beatmap.star_rating_taiko as StarRating[]);
			buffer.addStarRatings(beatmap.star_rating_ctb as StarRating[]);
			buffer.addStarRatings(beatmap.star_rating_mania as StarRating[]);
		}

		buffer.addInt(beatmap.drain_time as number);
		buffer.addInt(beatmap.total_time as number);
		buffer.addInt(beatmap.preview_time as number);
		buffer.addTimingPoints(beatmap.timing_points as TimingPoint[]);
		buffer.addInt(beatmap.beatmap_id as number);
		buffer.addInt(beatmap.beatmapset_id as number);
		buffer.addInt(beatmap.thread_id as number);

		buffer.addByte(beatmap.grade_achieved_std as number);
		buffer.addByte(beatmap.grade_achieved_taiko as number);
		buffer.addByte(beatmap.grade_achieved_ctb as number);
		buffer.addByte(beatmap.grade_achieved_mania as number);

		buffer.addShort(beatmap.local_offset as number);
		buffer.addSingle(beatmap.stack_laniecy as number);

		buffer.addByte(beatmap.gamemode_int as number);
		buffer.addString(beatmap.source as string);
		buffer.addString(beatmap.tags as string);
		buffer.addShort(beatmap.online_offset as number);
		buffer.addString(beatmap.font_title as string);
		buffer.addBool(beatmap.is_unplayed as boolean);
		buffer.addWindowTickrateFromDate(beatmap.last_played as Date);
		buffer.addBool(beatmap.is_OSZ2 as boolean);
		buffer.addString(beatmap.folder_name as string);
		buffer.addWindowTickrateFromDate(beatmap.last_checked_repository_time as Date);
		buffer.addBool(beatmap.is_ignore_hit_sounds as boolean);
		buffer.addBool(beatmap.is_ignore_skin as boolean);
		buffer.addBool(beatmap.is_disable_storyboard as boolean);
		buffer.addBool(beatmap.is_disable_video as boolean);
		buffer.addBool(beatmap.is_visual_override as boolean);

		if (osu_db.osu_version as number  < 20140609) {
			buffer.addShort(beatmap.unknown_value as number);
		}

		buffer.addInt(beatmap.mod_time as number);
		buffer.addByte(beatmap.mania_scroll as number);
		
    }

	buffer.addInt(osu_db.user_permissions_int as number);

    writeFileSync(file_path, buffer.getBuffer(), { encoding: 'binary'});
}