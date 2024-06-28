"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer_saver = exports.UTC1970Years = void 0;
const buffer_1 = __importDefault(require("buffer"));
exports.UTC1970Years = BigInt(62135596800000);
class buffer_saver {
    constructor() {
        this.file_buffer = Buffer.alloc(buffer_1.default.constants.MAX_LENGTH);
        this.cursor = 0;
        this.last_bytes = 0;
    }
    getBuffer() {
        return this.file_buffer.subarray(0, this.cursor);
    }
    buffer_write(val) {
        this.file_buffer.set(val, this.cursor);
        this.last_bytes = val.length;
        this.cursor += this.last_bytes;
    }
    addBool(val) {
        const writed_bytes = this.file_buffer.writeUInt8(Number(val), this.cursor) - this.cursor;
        this.last_bytes = 1;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addByte(val) {
        const writed_bytes = this.file_buffer.writeUInt8(val, this.cursor) - this.cursor;
        this.last_bytes = 1;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addShort(val) {
        const writed_bytes = this.file_buffer.writeUInt16LE(val, this.cursor) - this.cursor;
        this.last_bytes = 2;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addInt(val) {
        console.log('writeInt32LE', val);
        const writed_bytes = this.file_buffer.writeInt32LE(val, this.cursor) - this.cursor;
        this.last_bytes = 4;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addUInt(val) {
        const writed_bytes = this.file_buffer.writeUInt32LE(val, this.cursor) - this.cursor;
        this.last_bytes = 4;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addLong(val) {
        const writed_bytes = this.file_buffer.writeBigInt64LE(val, this.cursor) - this.cursor;
        this.last_bytes = 8;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addDouble(val) {
        const writed_bytes = this.file_buffer.writeDoubleLE(val, this.cursor) - this.cursor;
        this.last_bytes = 8;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addSingle(val) {
        const writed_bytes = this.file_buffer.writeFloatLE(val, this.cursor) - this.cursor;
        this.last_bytes = 4;
        this.cursor += this.last_bytes;
        if (writed_bytes != this.last_bytes) {
            console.error('value not passed checking', { val, writed_bytes, last_bytes: this.last_bytes, cursor: this.cursor });
        }
    }
    addWindowTickrate(val) {
        this.addLong(val);
    }
    addWindowTickrateFromDate(val) {
        //const tickrate = ( BigInt( val.getTime() ) + UTC1970Years ) * BigInt(10000);
        this.addLong(val.int);
    }
    addULEB128(number) {
        let out = [], a = number;
        do {
            let byte = a & 0b01111111;
            // we only care about lower 7 bits
            a >>= (8 - 1);
            // shift
            if (a)
                byte = byte | 0b10000000; /* if remaining is truthy (!= 0), set highest bit */
            out.push(byte);
        } while (a);
        this.buffer_write(Buffer.from(out));
    }
    addString(val) {
        if (val && val.length > 0) {
            const res = Buffer.from(val);
            this.addByte(0x0b);
            this.addULEB128(res.length);
            this.buffer_write(res);
        }
        else {
            this.addByte(0x0b);
            this.addByte(0);
        }
    }
    addStarRatings(arr) {
        this.addUInt(arr.length);
        if (arr.length > 0) {
            for (let val of arr) {
                this.addByte(val.mods_flag);
                this.addUInt(val.mods_int);
                this.addByte(val.stars_flag);
                this.addDouble(val.stars);
            }
        }
    }
    addTimingPoints(arr) {
        this.addUInt(arr.length);
        if (arr.length > 0) {
            for (let val of arr) {
                this.addDouble(val.bpm);
                this.addDouble(val.offset);
                this.addBool(val.is_inherit);
            }
        }
    }
}
exports.buffer_saver = buffer_saver;
