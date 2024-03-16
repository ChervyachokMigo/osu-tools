import { writeFileSync } from "fs";
import { buffer_saver } from "./buffer_saver";
import { scores_db_results } from "../parsers/scores_db";

export const scores_db_save = ( scores: scores_db_results, file_path: string = 'scores.db' ) => {
    let buffer = new buffer_saver();
    buffer.addInt(scores.osu_version as number);
    buffer.addInt(scores.beatmaps_scores.length);
    for ( let beatmap of scores.beatmaps_scores) {
        buffer.addString(beatmap.beatmap_md5);
        buffer.addInt(beatmap.scores.length);
        for (let score of beatmap.scores) {
            buffer.addByte(score.gamemode_int as number)
            buffer.addInt(score.score_version as number)
            buffer.addString(score.beatmap_md5 as string);
            buffer.addString(score.playername as Buffer);
            buffer.addString(score.replay_md5 as string);
            buffer.addShort(score.count_300 as number);
            buffer.addShort(score.count_100 as number);
            buffer.addShort(score.count_50 as number);
            buffer.addShort(score.count_geki as number);
            buffer.addShort(score.count_katu as number);
            buffer.addShort(score.count_miss as number);
            buffer.addInt(score.scores as number);
            buffer.addShort(score.combo as number);
            buffer.addBool(score.is_fc as boolean);
            buffer.addInt(score.mods_int as number);
            buffer.addByte(0);
            buffer.addWindowTickrate(score.windows_tick_date as bigint);
            buffer.addInt(0xffffffff);
            buffer.addLong(score.online_id as bigint);
            if (score.mods && score.mods.indexOf('Target') > -1){
                buffer.addDouble(score.target_practice_accuracy as number);
            } 
        }
		
    }
    writeFileSync(file_path, buffer.getBuffer(), { encoding: 'binary'});
}