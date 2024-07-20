"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scores_db_load = exports.scores_db = void 0;
const osu_file_1 = require("./osu_file");
const osu_file_type_1 = require("../consts/osu_file_type");
const score_parse_1 = require("../tools/score_parse");
class scores_db extends osu_file_1.osu_file {
    constructor(file_path, property_settings) {
        super(file_path, property_settings);
    }
    scores_db_parse() {
        console.log('start parsing scores db..');
        let scores_db = {
            osu_version: this.buff.getInt(),
            beatmaps_scores: []
        };
        let beatmaps_size = this.buff.getInt();
        if (beatmaps_size == 0) {
            return scores_db;
        }
        for (let b = 0; b < beatmaps_size; b++) {
            let current_beatmap = {
                beatmap_md5: this.buff.getString().toString(),
                scores: []
            };
            let scores_size = this.buff.getInt();
            if (scores_size > 0) {
                for (let s = 0; s < scores_size; s++) {
                    current_beatmap.scores.push((0, score_parse_1.score_parse)(this.buff, this.property_settings));
                }
            }
            scores_db.beatmaps_scores.push(current_beatmap);
        }
        console.log('end parsing scores db');
        return scores_db;
    }
}
exports.scores_db = scores_db;
/**
 * @returns scores_db_results with beatmaps includes scores
 * @param scores_db_path - absolute path to scores.db
 */
function scores_db_load(scores_db_path, score_properties) {
    var file_parse_result = { beatmaps_scores: [] };
    try {
        let scores_db_file = new scores_db(scores_db_path, score_properties);
        switch (scores_db_file.get_type()) {
            case osu_file_type_1.osu_file_type.scores_db:
                file_parse_result = scores_db_file.scores_db_parse();
                break;
            default:
                throw new Error('file type not osu file');
        }
        return file_parse_result;
    }
    catch (e) {
        console.log(e);
        return file_parse_result;
    }
}
exports.scores_db_load = scores_db_load;
