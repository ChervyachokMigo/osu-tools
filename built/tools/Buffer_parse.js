"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer_parse = exports.UTC1970Years = void 0;
//@ts-ignore
const lzma_1 = __importDefault(require("lzma"));
const bitwise_1 = __importDefault(require("bitwise"));
exports.UTC1970Years = BigInt(62135596800000);
class buffer_parse {
    constructor(file_handle, file_buffer) {
        this.file_buffer = file_buffer;
        this.file_handle = file_handle;
        this.cursor_offset = 0;
    }
    bufferRead(length) {
        let buf = this.file_buffer.subarray(this.cursor_offset, this.cursor_offset + length);
        this.cursor_offset += length;
        return buf;
    }
    getBool() {
        return Boolean(this.bufferRead(1).readUInt8());
    }
    skipBool() {
        this.cursor_offset += 1;
    }
    getByte() {
        return this.bufferRead(1).readUInt8();
    }
    skipBytes(length) {
        this.cursor_offset += length;
    }
    skipByte() {
        this.cursor_offset += 1;
    }
    getShort() {
        return this.bufferRead(2).readUInt16LE();
    }
    skipShort() {
        this.cursor_offset += 2;
    }
    getInt() {
        return this.bufferRead(4).readInt32LE();
    }
    getUInt() {
        return this.bufferRead(4).readUInt32LE();
    }
    skipInt() {
        this.cursor_offset += 4;
    }
    getLong() {
        return this.bufferRead(8).readBigInt64LE();
    }
    skipLong() {
        this.cursor_offset += 8;
    }
    getSingle() {
        return this.bufferRead(4).readFloatLE();
    }
    skipSingle() {
        this.cursor_offset += 4;
    }
    getDouble() {
        return this.bufferRead(8).readDoubleLE();
    }
    skipDouble() {
        this.cursor_offset += 8;
    }
    getWindowsTickDate() {
        return this.bufferRead(8).readBigInt64LE();
    }
    getDateTime() {
        let val = this.getWindowsTickDate();
        if (val > 0) {
            let date_value_without_ns = val / BigInt(10000);
            return { int: val, date: new Date(Number(date_value_without_ns - exports.UTC1970Years)) };
        }
        else {
            return { int: BigInt(0), date: new Date(0) };
        }
    }
    skipDateTime() {
        this.cursor_offset += 8;
    }
    getStarRatings() {
        let results = [];
        let count = this.bufferRead(4).readUInt32LE();
        for (let i = 0; i < count; i++) {
            let sr = {};
            sr.mods_flag = this.bufferRead(1).readUInt8();
            sr.mods_int = this.bufferRead(4).readUInt32LE();
            sr.stars_flag = this.bufferRead(1).readUInt8();
            sr.stars = this.bufferRead(8).readDoubleLE();
            results.push(sr);
        }
        return results;
    }
    skipStarRatings() {
        let count = this.bufferRead(4).readUInt32LE();
        this.cursor_offset += 14 * count;
    }
    getTimingPoints() {
        let results = [];
        let count = this.bufferRead(4).readUInt32LE();
        for (let i = 0; i < count; i++) {
            let TimingPoint = {
                bpm: 0.0,
                offset: 0.0,
                is_inherit: false
            };
            TimingPoint.bpm = this.bufferRead(8).readDoubleLE();
            TimingPoint.offset = this.bufferRead(8).readDoubleLE();
            TimingPoint.is_inherit = Boolean(this.bufferRead(1).readUInt8());
            results.push(TimingPoint);
        }
        return results;
    }
    skipTimingPoints() {
        let count = this.bufferRead(4).readUInt32LE();
        this.cursor_offset += 17 * count;
    }
    getString() {
        let stringCode = this.bufferRead(1).readUInt8();
        let res = '';
        if (stringCode === 0) {
            return res;
        }
        if (stringCode === 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                res = this.bufferRead(stringLength).toString('utf8');
            }
            return res;
        }
        else {
            console.log('stringCode', stringCode);
            console.log('error read string');
            return res;
        }
    }
    getStringAsBuffer() {
        let stringCode = this.bufferRead(1).readUInt8();
        let res = Buffer.alloc(0);
        if (stringCode === 0) {
            return {
                string_code: stringCode,
                buffer: res
            };
        }
        if (stringCode === 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                res = this.bufferRead(stringLength);
            }
            return {
                string_code: stringCode,
                buffer: res
            };
        }
        else {
            console.log('error read string. ', 'unknown stringCode', stringCode);
            return {
                string_code: stringCode,
                buffer: res
            };
        }
    }
    skipString() {
        let stringCode = this.bufferRead(1).readUInt8();
        if (stringCode === 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                this.cursor_offset += stringLength;
            }
        }
    }
    getULEB128() {
        let result = 0;
        let shift = 0;
        while (true) {
            let byte = this.bufferRead(1).readUInt8();
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0)
                break;
            shift += 7;
        }
        return result;
    }
    getHpBar() {
        let hp_bar_raw = this.getString();
        let hp_bar = [];
        if (hp_bar_raw.length > 0) {
            for (let hp_value of hp_bar_raw.split(',').map(value => value.split('|')).filter(value => value.length >= 2)) {
                let hp_bar_item = {
                    offset: parseInt(hp_value[0]),
                    hp: parseFloat(hp_value[1])
                };
                hp_bar.push(hp_bar_item);
            }
        }
        return hp_bar;
    }
    getLZMAString(encoded_buffer) {
        return lzma_1.default.decompress(encoded_buffer);
    }
    getReplayData() {
        const result = { replay_seed: 0, replay_frames: [], replay_frames_raw: [] };
        const replay_data_size = this.bufferRead(4).readUInt32LE();
        if (replay_data_size === 0xffffffff || replay_data_size <= 0) {
            return result;
        }
        if (replay_data_size > 0) {
            let buffer = this.bufferRead(replay_data_size);
            let replay_data_array = this.getLZMAString(buffer).split(',')
                //@ts-ignore
                .map(value => value.split('|'))
                //@ts-ignore
                .filter(value => value.length === 4);
            result.replay_frames_raw = replay_data_array;
            if (replay_data_array.length > 0) {
                if (replay_data_array[replay_data_array.length - 1][0] == '-12345') {
                    let replay_seed = replay_data_array.pop();
                    result.replay_seed = typeof replay_seed !== undefined && replay_seed && replay_seed.length === 4 ?
                        parseInt(replay_seed[3]) : 0;
                }
                let offset = BigInt(0);
                for (let replay_frame_data of replay_data_array) {
                    if (replay_frame_data.length == 4) {
                        let keysbyte = parseInt(replay_frame_data[3]);
                        offset += BigInt(replay_frame_data[0]);
                        let replay_action = {
                            offset: offset,
                            time: BigInt(replay_frame_data[0]),
                            x: parseFloat(replay_frame_data[1]),
                            y: parseFloat(replay_frame_data[2]),
                            keys_pressed: {
                                Key_1: Boolean(bitwise_1.default.integer.getBit(keysbyte, 0)),
                                Key_2: Boolean(bitwise_1.default.integer.getBit(keysbyte, 1)),
                                Key_3: Boolean(bitwise_1.default.integer.getBit(keysbyte, 2)),
                                Key_4: Boolean(bitwise_1.default.integer.getBit(keysbyte, 3)),
                                Key_Smoke: Boolean(bitwise_1.default.integer.getBit(keysbyte, 4)),
                            }
                        };
                        result.replay_frames.push(replay_action);
                    }
                }
            }
        }
        return result;
    }
}
exports.buffer_parse = buffer_parse;
