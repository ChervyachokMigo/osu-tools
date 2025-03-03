"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replay_load = exports.replay_osr = void 0;
const osu_file_1 = require("./osu_file");
const osu_file_type_1 = require("../consts/osu_file_type");
const score_parse_1 = require("../tools/score_parse");
class replay_osr extends osu_file_1.osu_file {
    constructor(file_path, property_settings) {
        super(file_path, property_settings);
        this.file_type = osu_file_type_1.osu_file_type.replay_osr;
    }
    replay_osr_parse() {
        console.log('start parsing replay..');
        var result = (0, score_parse_1.score_parse)(this.buff, this.property_settings);
        console.log('end parsing replay');
        return result;
    }
}
exports.replay_osr = replay_osr;
/**
 * @returns score object
 * @param replay_osr_path - absolute path to replay.osr file
 * @example
 * var replay = replay_load('E:\\osu!\\Replays\\replay-osu_3560727_4340069944.osr', all_score_properties);
 */
function replay_load(replay_osr_path, replay_properties) {
    let result = {};
    try {
        const replay_osr_file = new replay_osr(replay_osr_path, replay_properties);
        result = replay_osr_file.replay_osr_parse();
        replay_osr_file.close();
        return result;
    }
    catch (e) {
        console.log(e);
        return result;
    }
}
exports.replay_load = replay_load;
