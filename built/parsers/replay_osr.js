"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replay_load = exports.replay_osr = void 0;
const osu_file_1 = require("./osu_file");
const osu_file_type_1 = require("../consts/osu_file_type");
const score_parse_1 = require("../tools/score_parse");
class replay_osr extends osu_file_1.osu_file {
    constructor(file_path, property_settings) {
        super(file_path, property_settings);
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
    var file_parse_result = {};
    try {
        let replay_osr_file = new replay_osr(replay_osr_path, replay_properties);
        switch (replay_osr_file.get_type()) {
            case osu_file_type_1.osu_file_type.replay_osr:
                file_parse_result = replay_osr_file.replay_osr_parse();
                break;
            default:
                throw new Error('file type not osu replay file');
        }
        return file_parse_result;
    }
    catch (e) {
        console.log(e);
        return file_parse_result;
    }
}
exports.replay_load = replay_load;
