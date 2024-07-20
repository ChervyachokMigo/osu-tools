import { StarRating, TimingPoint, WindowsTickRate } from '../consts/variable_types';

export const UTC1970Years = BigInt(62135596800000);

export class buffer_saver {

    file_buffer: Array<Buffer>;

    constructor( ) {
        this.file_buffer = [];
    }

    getBuffer(): Buffer {
        return Buffer.concat(this.file_buffer);
    }

	buffer_write(buf: Buffer): void  {
		this.file_buffer.push(buf);
    }

    addBool(val: boolean): void {
		const buf = Buffer.allocUnsafe(1);
		buf.writeUInt8(Number(val), 0);
		this.file_buffer.push(buf);
    }

    addByte(val: number): void {
		const buf = Buffer.allocUnsafe(1);
		buf.writeUInt8(val, 0);
		this.file_buffer.push(buf);
    }

    addShort(val: number): void {
		const buf = Buffer.allocUnsafe(2);
		buf.writeUInt16LE(val, 0);
		this.file_buffer.push(buf);
    }

    addInt(val: number): void {
		const buf = Buffer.allocUnsafe(4);
		buf.writeInt32LE(val, 0);
		this.file_buffer.push(buf);
    }

	addUInt(val: number): void {
		const buf = Buffer.allocUnsafe(4);
		buf.writeUInt32LE(val, 0);
		this.file_buffer.push(buf);
    }

    addLong(val: bigint): void {
		const buf = Buffer.allocUnsafe(8);
		buf.writeBigInt64LE(val, 0);
		this.file_buffer.push(buf);
    }

    addDouble(val: number): void {
		const buf = Buffer.allocUnsafe(8);
		buf.writeDoubleLE(val, 0);
		this.file_buffer.push(buf);
    }

	addSingle(val: number): void {
		const buf = Buffer.allocUnsafe(4);
		buf.writeFloatLE(val, 0);
		this.file_buffer.push(buf);
	}

    addWindowTickrate(val: bigint) {
		this.addLong(val);
    }

	addWindowTickrateFromDate( val: WindowsTickRate ) {
		//const tickrate = ( BigInt( val.getTime() ) + UTC1970Years ) * BigInt(10000);
		this.addLong(val.int);
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

	addStarRatings(arr: Array<StarRating>) {
		this.addUInt(arr.length);
		if (arr.length > 0) {
			for (let val of arr) {
				this.addByte(val.mods_flag as number);
				this.addUInt(val.mods_int as number);
				this.addByte(val.stars_flag as number);
				this.addDouble(val.stars as number);
			}
		}
	}

	addTimingPoints(arr: Array<TimingPoint>) {
		this.addUInt(arr.length);
		if (arr.length > 0) {
			for (let val of arr) {
				this.addDouble(val.bpm as number);
				this.addDouble(val.offset as number);
				this.addBool(val.is_inherit as boolean);
			}
		}
	}

}