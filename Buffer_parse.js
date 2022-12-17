"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffer_parse = void 0;
const fs_1 = __importDefault(require("fs"));
const modes_1 = require("./modes");
const UTC1970Years = BigInt(62135596800000);
class Buffer_parse {
    constructor(file_handle) {
        this.file_handle = file_handle;
        this.cursor_offset = 0;
    }
    bufferRead(offset, length) {
        let buf = Buffer.alloc(length);
        fs_1.default.readSync(this.file_handle, buf, 0, length, offset);
        return buf;
    }
    getDateTime() {
        let windows_tick_date_value = this.getLong();
        if (windows_tick_date_value > 0) {
            let date_value_without_ns = windows_tick_date_value / BigInt(10000);
            return new Date(Number(date_value_without_ns - UTC1970Years));
        }
        else {
            return new Date(0);
        }
    }
    skipDateTime() {
        this.cursor_offset += 8;
    }
    getBool() {
        return Boolean(this.getInt(1));
    }
    skipBool() {
        this.cursor_offset += 1;
    }
    getByte() {
        return this.getInt(1);
    }
    skipByte() {
        this.cursor_offset += 1;
    }
    getShort() {
        return this.getInt(2);
    }
    skipShort() {
        this.cursor_offset += 2;
    }
    getLong() {
        let res = this.bufferRead(this.cursor_offset, 8);
        this.cursor_offset += 8;
        return res.readBigInt64LE(0);
    }
    skipLong() {
        this.cursor_offset += 8;
    }
    getInt(length = 4) {
        let res = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch (length) {
            case 1:
                return res.readInt8(0);
            case 2:
                return res.readInt16LE(0);
            case 4:
                return res.readInt32LE(0);
            default: throw new Error('wrong number length');
        }
    }
    skipInt() {
        this.cursor_offset += 4;
    }
    getStarRatings() {
        let result = [];
        let count = this.getInt();
        for (let i = 0; i < count; i++) {
            let sr = { mods: [], mods_int: 0, stars: 0 };
            this.getByte();
            sr.mods_int = this.getInt();
            sr.mods = (0, modes_1.ModsIntToText)(sr.mods_int);
            this.getByte();
            sr.stars = this.getDouble();
            result.push(sr);
        }
        return result;
    }
    getIntDoublePairs() {
        let result = [];
        let count = this.getInt();
        for (let i = 0; i < count; i++) {
            let sr = { int: 0, double: 0 };
            this.getByte();
            sr.int = this.getInt();
            this.getByte();
            sr.double = this.getDouble();
            result.push(sr);
        }
        return result;
    }
    skipIntDoublePairs() {
        let count = this.getInt();
        this.cursor_offset += 14 * count;
    }
    getTimingPoints() {
        var result = [];
        let count = this.getInt();
        for (let i = 0; i < count; i++) {
            result.push(this.getTimingPoint());
        }
        return result;
    }
    getTimingPoint() {
        let result = { bpm: 0, offset: 0, is_inherit: false };
        result.bpm = this.getDouble();
        result.offset = this.getDouble();
        result.is_inherit = this.getBool();
        return result;
    }
    skipTimingPoints() {
        let timingPointsNumber = this.getInt();
        this.cursor_offset += 17 * timingPointsNumber;
    }
    getSingle() {
        return this.getFloat(4);
    }
    skipSingle() {
        this.cursor_offset += 4;
    }
    getDouble() {
        return this.getFloat(8);
    }
    skipDouble() {
        this.cursor_offset += 8;
    }
    getFloat(length) {
        let buf = this.bufferRead(this.cursor_offset, length);
        this.cursor_offset += length;
        switch (length) {
            case 4:
                return buf.readFloatLE(0);
            case 8:
                return buf.readDoubleLE(0);
            default:
                throw new Error('wrong number length');
        }
    }
    getString() {
        let stringCode = this.getByte();
        if (stringCode == 0) {
            return '';
        }
        if (stringCode == 11) {
            let stringLength = this.getULEB128();
            let result = '';
            if (stringLength > 0) {
                result = this.bufferRead(this.cursor_offset, stringLength).toString();
                this.cursor_offset += stringLength;
            }
            return result;
        }
        else {
            console.log('error read string');
            return '';
        }
    }
    skipString() {
        let stringCode = this.getByte();
        if (stringCode == 11) {
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
            let byte = this.getInt(1);
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0)
                break;
            shift += 7;
        }
        return result;
    }
}
exports.Buffer_parse = Buffer_parse;
