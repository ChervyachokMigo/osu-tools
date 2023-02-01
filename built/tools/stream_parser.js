"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimingPoints = exports.getStarRatings = exports.getDouble = exports.getSingle = exports.getString = exports.getULEB128 = exports.getByte = exports.getDateTime = exports.getLong = exports.getBool = exports.getShort = exports.getInt = void 0;
const UTC1970Years = BigInt(62135596800000);
function getInt(stream) {
    console.log(stream);
    console.log(stream.read(4));
    return Buffer.from(stream.read(4)).readInt32LE();
}
exports.getInt = getInt;
function getShort(stream) {
    return Buffer.from(stream.read(2)).readInt16LE();
}
exports.getShort = getShort;
function getBool(stream) {
    return Boolean(Buffer.from(stream.read(1)).readUInt8());
}
exports.getBool = getBool;
function getLong(stream) {
    return Buffer.from(stream.read(8)).readBigInt64LE();
}
exports.getLong = getLong;
function getDateTime(stream) {
    let windows_tick_date_value = getLong(stream);
    if (windows_tick_date_value > 0) {
        let date_value_without_ns = windows_tick_date_value / BigInt(10000);
        return new Date(Number(date_value_without_ns - UTC1970Years));
    }
    else {
        return new Date(0);
    }
}
exports.getDateTime = getDateTime;
function getByte(stream) {
    return Buffer.from(stream.read(1)).readUInt8();
}
exports.getByte = getByte;
function getULEB128(stream) {
    let result = 0;
    let shift = 0;
    while (true) {
        let byte = getByte(stream);
        result |= (byte & 0x7f) << shift;
        if ((byte & 0x80) === 0)
            break;
        shift += 7;
    }
    return result;
}
exports.getULEB128 = getULEB128;
function getString(stream) {
    let stringCode = getByte(stream);
    if (stringCode == 0) {
        return '';
    }
    if (stringCode == 11) {
        let stringLength = getULEB128(stream);
        let result = '';
        if (stringLength > 0) {
            result = Buffer.from(stream.read(stringLength)).toString();
        }
        return result;
    }
    else {
        console.log('String Code Unstandart:', stringCode);
        console.log('Error read string');
        return '';
    }
}
exports.getString = getString;
function getSingle(stream) {
    return Buffer.from(stream.read(4)).readFloatLE();
}
exports.getSingle = getSingle;
function getDouble(stream) {
    return Buffer.from(stream.read(8)).readDoubleLE();
}
exports.getDouble = getDouble;
function getStarRatings(stream) {
    let result = [];
    let count = getInt(stream);
    for (let i = 0; i < count; i++) {
        let sr = {
            //mods: [],
            mods_int: 0,
            stars: 0
        };
        getByte(stream);
        sr.mods_int = getInt(stream);
        //sr.mods = ModsIntToText(sr.mods_int);
        getByte(stream);
        sr.stars = getDouble(stream);
        result.push(sr);
    }
    return result;
}
exports.getStarRatings = getStarRatings;
function getTimingPoints(stream) {
    var results = [];
    let count = getInt(stream);
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            let result = {
                bpm: 0,
                offset: 0,
                is_inherit: false
            };
            result.bpm = getDouble(stream);
            result.offset = getDouble(stream);
            result.is_inherit = getBool(stream);
            results.push(result);
        }
    }
    return results;
}
exports.getTimingPoints = getTimingPoints;
