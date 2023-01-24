import { ReadStream } from "fs";
import { StarRating, TimingPoint } from '../consts/variable_types';
import { ModsIntToText }  from '../consts/modes';

const UTC1970Years = BigInt(62135596800000);

export function getInt (stream: ReadStream){
    console.log(stream);
    console.log(stream.read(4));
    return Buffer.from(stream.read(4)).readInt32LE();
}

export function getShort (stream: ReadStream){
    return Buffer.from(stream.read(2)).readInt16LE();
}

export function getBool (stream: ReadStream){
    return Boolean(Buffer.from(stream.read(1)).readUInt8());
}

export function getLong(stream: ReadStream): bigint {
    return Buffer.from(stream.read(8)).readBigInt64LE();

}

export function getDateTime(stream: ReadStream): Date {
    let windows_tick_date_value = getLong(stream);
    if (windows_tick_date_value > 0){
        let date_value_without_ns: bigint = windows_tick_date_value / BigInt(10000);
        return new Date( Number(date_value_without_ns - UTC1970Years ) );
    } else {
        return new Date(0);
    }
}

export function getByte (stream: ReadStream){
    return Buffer.from(stream.read(1)).readUInt8();
}

export function getULEB128(stream: ReadStream): number {
    let result: number = 0;
    let shift: number = 0;
    while (true) {
        let byte: number = getByte (stream);
        result |= (byte & 0x7f) << shift;
        if ((byte & 0x80) === 0)
            break;
        shift += 7;
    }
    return result;
}

export function getString(stream: ReadStream): string {
    let stringCode = getByte (stream);

    if ( stringCode == 0 ) {
        return '';
    }

    if (stringCode == 11) {
        let stringLength = getULEB128(stream);
        let result = '';
        if (stringLength > 0) {
            result = Buffer.from(stream.read(stringLength)).toString();
        }
        return result;
    } else {
        console.log('String Code Unstandart:', stringCode)
        console.log('Error read string');
        return '';
    }
}

export function getSingle(stream: ReadStream){
    return Buffer.from(stream.read(4)).readFloatLE();
}

export function getDouble(stream: ReadStream){
    return Buffer.from(stream.read(8)).readDoubleLE();
}

export function getStarRatings(stream: ReadStream): Array<StarRating> {
    let result: Array<StarRating> = [];
    let count = getInt(stream);

    for (let i = 0; i < count; i++) {

        let sr: StarRating = { 
            mods: [],
            mods_int: 0,
            stars: 0
        };

        getByte(stream);

        sr.mods_int = getInt(stream);

        sr.mods = ModsIntToText(sr.mods_int);

        getByte(stream);

        sr.stars = getDouble(stream);

        result.push(sr);
    }
    return result;
}

export function getTimingPoints(stream: ReadStream): Array<TimingPoint> {
    var results: Array<TimingPoint> = [];

    let count = getInt(stream);

    if (count > 0){
        for (let i = 0; i < count; i++) {

            let result: TimingPoint = { 
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
