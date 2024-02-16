import { TimingPoint, IntDoublePair, StarRating, HP_Bar, ReplayData, ReplayFrame } from '../consts/variable_types';

import { decompressLZMASync } from '../lib/decompressLZMASync';
import bitwise from 'bitwise';

export const UTC1970Years = BigInt(62135596800000);
/*
import fs from 'fs';
import util from 'util';
import path from 'path';

var log_file = fs.createWriteStream(path.join(path.dirname(process.argv[1]),'debug.log'), {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};*/


export class buffer_parse {
    file_handle: number;
    cursor_offset: number;
    file_buffer: Buffer;

    constructor( file_handle: number, file_buffer: Buffer) {
        this.file_buffer = file_buffer;
        this.file_handle = file_handle;
        this.cursor_offset = 0;
    }

    bufferRead(length: number): Buffer {
        //console.log(this.file_buffer.length)
        //console.log(this.cursor_offset, length)

        let buf = this.file_buffer.subarray(this.cursor_offset, this.cursor_offset + length)

        //fs.readSync(this.file_handle, buf, 0, length, this.cursor_offset);
        this.cursor_offset += length;
        return buf;
    }

    getWindowsTickDate(): BigInt {
        return this.bufferRead(8).readBigInt64LE();
    }

    getDateTime(): Date {
        let windows_tick_date_value: any = this.getWindowsTickDate();
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
        return Boolean(this.bufferRead(1).readUInt8());
    }

    skipBool(): void {
        this.cursor_offset += 1;
    }

    getByte(): number {
        return this.bufferRead(1).readUInt8();
    }

    skipBytes(length: number): void {
        this.cursor_offset += length;
    }

    skipByte(): void {
        this.cursor_offset += 1;
    }

    getShort(): number {
        return this.bufferRead(2).readInt16LE();
    }

    skipShort(): void {
        this.cursor_offset += 2;
    }

    getLong(): bigint {
        return this.bufferRead(8).readBigInt64LE();
    }

    skipLong(): void {
        this.cursor_offset += 8;
    }

    getInt(): number {
        return this.bufferRead(4).readInt32LE();
    }

    skipInt(): void {
        this.cursor_offset += 4;
    }

    getStarRatings(): Array<StarRating> {
        let results: Array<StarRating> = [];
        let count = this.bufferRead(4).readInt32LE();

        for (let i = 0; i < count; i++) {
            
            let sr: StarRating = {};
            
            this.cursor_offset += 1;
            sr.mods_int = this.bufferRead(4).readInt32LE();
            this.cursor_offset += 1;
            sr.stars = this.bufferRead(8).readDoubleLE();

            //sr.mods = ModsIntToText(sr.mods_int)

            results.push(sr);
        }
        return results;
    }

    skipStarRatings(): void {
        let count = this.bufferRead(4).readInt32LE();
        this.cursor_offset += 14 * count;
    }

    getTimingPoints(): Array<TimingPoint> {
        let results: Array<TimingPoint> = [];
        let count = this.bufferRead(4).readInt32LE();

        for (let i = 0; i < count; i++) {
            let TimingPoint: TimingPoint = {
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

    skipTimingPoints(): void {
        let count = this.bufferRead(4).readInt32LE();
        this.cursor_offset += 17 * count;
    }

    getSingle(): number {
        return this.bufferRead(4).readFloatLE();
    }

    skipSingle(): void {
        this.cursor_offset += 4;
    }

    getDouble(): number {
        return this.bufferRead(8).readDoubleLE();
    }

    skipDouble(): void {
        this.cursor_offset += 8;
    }

    getString(): string {
        let stringCode = this.bufferRead(1).readUInt8();
        let res = '';

        if ( stringCode === 0 ) {
            return res
        }

        if (stringCode === 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                res = this.bufferRead(stringLength).toString('utf8');
            }
            return res;
        } else {
            console.log('stringCode',stringCode)
            console.log('error read string');
            return res
        }
    }

    getStringAsBuffer(): Buffer {
        let stringCode = this.bufferRead(1).readUInt8();
        let res = Buffer.alloc(0);

        if ( stringCode === 0 ) {
            return res;
        }

        if (stringCode === 11) {
            let stringLength = this.getULEB128();
            if (stringLength > 0) {
                res = this.bufferRead(stringLength)                
            }
            return res;
        } else {
            console.log('stringCode',stringCode)
            console.log('error read string');
            return res;
        }
    }

    skipString(): void  {
        let stringCode = this.bufferRead(1).readUInt8();
        if (stringCode === 11) {
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
            let byte: number = this.bufferRead(1).readUInt8();
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
        const result: ReplayData = { replay_seed: 0, replay_frames: [], replay_frames_raw: [] };
        const replay_data_size = this.bufferRead(4).readInt32LE();

        if (replay_data_size === 0xffffffff || replay_data_size <= 0 ) {
            return result;
        }

        if (replay_data_size > 0 ){
			let buffer = this.bufferRead(replay_data_size);
            let replay_data_array = this.getLZMAString(buffer).split(',') 
                .map( value => value.split('|'))
                .filter ( value => value.length === 4 );
            result.replay_frames_raw = replay_data_array;

            if (replay_data_array.length > 0){

                if (replay_data_array[replay_data_array.length-1][0] == '-12345' ){
                    let replay_seed = replay_data_array.pop();
                    result.replay_seed = typeof replay_seed !== undefined  && replay_seed && replay_seed.length === 4 ? 
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
