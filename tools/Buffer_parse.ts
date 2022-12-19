import fs from 'fs';
import { TimingPoint, IntDoublePair, StarRating } from '../consts/variable_types';
import { ModsIntToText }  from '../consts/modes';

const UTC1970Years = BigInt(62135596800000);

export class Buffer_parse {
    file_handle: number;
    cursor_offset: number;

    constructor(file_handle: number) {
        this.file_handle = file_handle;
        this.cursor_offset = 0;
    }

    bufferRead(offset: number, length: number): Buffer {
        let buf = Buffer.alloc(length);
        fs.readSync(this.file_handle, buf, 0, length, offset);
        return buf;
    }

    getDateTime(): Date {
        let windows_tick_date_value = this.getLong();
        if (windows_tick_date_value > 0){
            let date_value_without_ns: bigint = windows_tick_date_value / BigInt(10000);
            return new Date( Number(date_value_without_ns - UTC1970Years ) );
        } else {
            return new Date(0);
        }
    }

    skipDateTime(): void {
        this.cursor_offset += 8;
    }

    getBool(): boolean {
        return Boolean(this.getInt(1));
    }

    skipBool(): void {
        this.cursor_offset += 1;
    }

    getByte(): number {
        return this.getInt(1);
    }

    skipByte(): void {
        this.cursor_offset += 1;
    }

    getShort(): number {
        return this.getInt(2);
    }

    skipShort(): void {
        this.cursor_offset += 2;
    }

    getLong(): bigint {
        let res = this.bufferRead(this.cursor_offset, 8);
        this.cursor_offset += 8;
        return res.readBigInt64LE(0);
    }

    skipLong(): void {
        this.cursor_offset += 8;
    }

    getInt(length: number = 4): number {
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

    skipInt(): void {
        this.cursor_offset += 4;
    }

    getStarRatings(): Array<StarRating> {
        let result: Array<StarRating> = [];
        let count = this.getInt();

        for (let i = 0; i < count; i++) {
            let sr: StarRating = { mods: [], mods_int: 0, stars: 0 };

            this.getByte();
            sr.mods_int = this.getInt();

            sr.mods = ModsIntToText(sr.mods_int);

            this.getByte();
            sr.stars = this.getDouble();

            result.push(sr);
        }
        return result;
    }

    getIntDoublePairs(): Array<IntDoublePair> {
        let result: Array<IntDoublePair> = [];
        let count = this.getInt();

        for (let i = 0; i < count; i++) {
            let sr: IntDoublePair = { int: 0, double: 0 };

            this.getByte();
            sr.int = this.getInt();

            this.getByte();
            sr.double = this.getDouble();

            result.push(sr);
        }
        return result;
    }

    skipIntDoublePairs(): void {
        let count = this.getInt();
        this.cursor_offset += 14 * count;
    }

    getTimingPoints(): Array<TimingPoint> {
        var result: Array<TimingPoint> = [];
        let count = this.getInt();

        for (let i = 0; i < count; i++) {
            result.push(this.getTimingPoint());
        }
        return result;
    }

    getTimingPoint(): TimingPoint {
        let result: TimingPoint = { bpm: 0, offset: 0, is_inherit: false };

        result.bpm = this.getDouble();
        result.offset = this.getDouble();
        result.is_inherit = this.getBool();

        return result;
    }

    skipTimingPoints(): void {
        let timingPointsNumber = this.getInt();
        this.cursor_offset += 17 * timingPointsNumber;
    }

    getSingle(): number {
        return this.getFloat(4);
    }

    skipSingle(): void {
        this.cursor_offset += 4;
    }

    getDouble(): number {
        return this.getFloat(8);
    }

    skipDouble(): void {
        this.cursor_offset += 8;
    }

    getFloat(length: number): number {
        let buf: Buffer = this.bufferRead(this.cursor_offset, length);
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

    getString(): string {
        let stringCode = this.getByte();

        if ( stringCode == 0 ) {
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

        } else {
            console.log('stringCode',stringCode)
            console.log('error read string');
            return '';

        }
    }

    skipString(): void {
        let stringCode = this.getByte();
        if (stringCode == 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                this.cursor_offset += stringLength;
            }
        }
    }

    getULEB128(): number {
        let result: number = 0;
        let shift: number = 0;
        while (true) {
            let byte: any = this.getInt(1);
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0)
                break;
            shift += 7;
        }
        return result;
    }
}
