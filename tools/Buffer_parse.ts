import fs from 'fs';
import { TimingPoint, IntDoublePair, StarRating, HP_Bar, ReplayData, ReplayFrame } from '../consts/variable_types';
import { ModsIntToText }  from '../consts/modes';
import { decompressLZMASync } from '../lib/decompressLZMASync';
import bitwise from 'bitwise';

const UTC1970Years = BigInt(62135596800000);

export class Buffer_parse {
    file_handle: number;
    cursor_offset: number;

    constructor(file_handle: number) {
        this.file_handle = file_handle;
        this.cursor_offset = 0;
    }

    bufferRead(length: number): Buffer {
        let buf = Buffer.alloc(length);
        fs.readSync(this.file_handle, buf, 0, length, this.cursor_offset);
        this.cursor_offset += length;
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
        let res = this.bufferRead(8);
        return res.readBigInt64LE(0);
    }

    skipLong(): void {
        this.cursor_offset += 8;
    }

    getInt(length: number = 4): number {
        let res = this.bufferRead(length);
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
        let buf: Buffer = this.bufferRead(length);
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
        let res = '';

        if ( stringCode == 0 ) {
            return res;
        }

        if (stringCode == 11) {

            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                res = this.bufferRead(stringLength).toString();
            }
            return res;

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

    getHpBar(): HP_Bar[] {
        let hp_bar_raw: string = this.getString();
        let hp_bar: HP_Bar[] = [];

        if (hp_bar_raw.length > 0) {
            for (let hp_value of hp_bar_raw.split(',') .map( value => value.split('|')) .filter( value => value.length >= 2)){
                let hp_bar_item: HP_Bar = {
                    offset: parseInt(hp_value[0]), 
                    hp: parseFloat(hp_value[1])
                }
                hp_bar.push(hp_bar_item);
            }
        }
        return hp_bar;
    }

    private getLZMAString(encoded_buffer: Buffer){
        return decompressLZMASync(encoded_buffer);
    }

    getReplayData(): ReplayData {
        const result: ReplayData = { replay_seed: 0, replay_frames: [] };
        const replay_data_size = this.getInt();

        if (replay_data_size > 0){
			let buffer = this.bufferRead(replay_data_size);

            let replay_data_array = this.getLZMAString(buffer).split(',') 
                .map( value => value.split('|'))
                .filter ( value => value.length == 4 );
    
            if (replay_data_array.length > 0){

                if (replay_data_array[replay_data_array.length-1][0] == '-12345' ){
                    let replay_seed = replay_data_array.pop();
                    result.replay_seed = typeof replay_seed !== undefined  && replay_seed && replay_seed.length == 4 ? 
                        parseInt(replay_seed[3]) : 0;
                }

                let offset: bigint = BigInt(0);
                for (let replay_frame_data of replay_data_array){
                    if (replay_frame_data.length == 4){
                        let keysbyte = parseInt(replay_frame_data[3]);
                        offset += BigInt(replay_frame_data[0]);

                        let replay_action: ReplayFrame = {
                            offset: offset,
                            time: BigInt(replay_frame_data[0]),
                            x: parseFloat(replay_frame_data[1]),
                            y: parseFloat(replay_frame_data[2]),
                            keys_pressed: {
                                Key_1: Boolean(bitwise.integer.getBit( keysbyte, 0 )), 
                                Key_2: Boolean(bitwise.integer.getBit( keysbyte, 1 )), 
                                Key_3: Boolean(bitwise.integer.getBit( keysbyte, 2 )), 
                                Key_4: Boolean(bitwise.integer.getBit( keysbyte, 3 )),
                                Key_Smoke: Boolean(bitwise.integer.getBit( keysbyte, 4 )),
                            }
                        }
                        result.replay_frames.push(replay_action);
                    }
                }
            }
        }

		return result;
    }
}
