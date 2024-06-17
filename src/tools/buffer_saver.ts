import buffer from 'buffer'
import { StarRating, TimingPoint } from '../consts/variable_types';

export const UTC1970Years = BigInt(62135596800000);

export class buffer_saver {

    file_buffer: Buffer;
	cursor: number;
	last_bytes: number;

    constructor( ) {
        this.file_buffer = Buffer.alloc(buffer.constants.MAX_LENGTH);
		this.cursor = 0;
		this.last_bytes = 0;
    }

    getBuffer(): Buffer {
        return this.file_buffer.subarray( 0, this.cursor );
    }

	buffer_write(val: Buffer): void  {
		this.file_buffer.set(val, this.cursor);
		this.last_bytes = val.length;
		this.cursor += this.last_bytes;
    }

    addWindowTickrate(val: bigint) {
		this.addLong(val);
    }

	addWindowTickrateFromDate( val: Date ) {
		const tickrate = ( BigInt( val.getTime() ) + UTC1970Years ) * BigInt(10000);
		this.addLong(tickrate);
	}

    addULEB128(number: number) {
        let out: number[] = [], a = number;
        do {
            let byte = a & 0b01111111;
            // we only care about lower 7 bits
            a >>= (8 - 1);
            // shift
            if (a) byte = byte | 0b10000000; /* if remaining is truthy (!= 0), set highest bit */
            out.push(byte);
        }
        while (a);
		this.buffer_write(Buffer.from(out));
    }

    addString(val: string | Buffer) {
        if (val && val.length > 0) {
			const res = Buffer.from(val);
			this.addByte(0x0b);
            this.addULEB128(res.length);
			this.buffer_write(res);
        } else {
			this.addByte(0x0b);
            this.addByte(0);
        }
    }

    addBool(val: boolean): void {
		const writed_bytes = this.file_buffer.writeUInt8(Number(val), this.cursor) - this.cursor;
		this.last_bytes = 1;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
    }

    addByte(val: number): void {
		const writed_bytes = this.file_buffer.writeUInt8(val, this.cursor) - this.cursor;
		this.last_bytes = 1;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
    }

    addShort(val: number): void {
		const writed_bytes = this.file_buffer.writeUInt16LE(val, this.cursor) - this.cursor;
		this.last_bytes = 2;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
    }

    addInt(val: number): void {
		try {
		const writed_bytes = this.file_buffer.writeUInt32LE(val, this.cursor) - this.cursor;
		this.last_bytes = 4;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
		} catch (e) {
			
			console.log('getted value', val);
			throw e
		}
    }

    addLong(val: bigint): void {
		const writed_bytes = this.file_buffer.writeBigInt64LE(val, this.cursor) - this.cursor;
		this.last_bytes = 8;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
    }

    addDouble(val: number): void {
		const writed_bytes = this.file_buffer.writeDoubleLE(val, this.cursor) - this.cursor;
		this.last_bytes = 8;
		this.cursor += this.last_bytes;
		if (writed_bytes != this.last_bytes){
			console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
		}
    }

	addSingle(val: number): void {
		const writed_bytes = this.file_buffer.writeFloatLE(val, this.cursor) - this.cursor;
        this.last_bytes = 4;
        this.cursor += this.last_bytes;
        if (writed_bytes!= this.last_bytes){
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor })
        }
	}

	addStarRatings(arr: Array<StarRating>) {
		this.addInt(arr.length);
		if (arr.length > 0) {
			for (let val of arr) {
				this.addInt(val.mods_int as number);
				this.addDouble(val.stars as number);
			}
		}
	}

	addTimingPoints(arr: Array<TimingPoint>) {
		this.addInt(arr.length);
		if (arr.length > 0) {
			for (let val of arr) {
				this.addDouble(val.bpm as number);
				this.addDouble(val.offset as number);
				this.addBool(val.is_inherit as boolean);
			}
		}
	}

}