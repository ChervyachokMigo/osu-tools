"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer_saver = exports.UTC1970Years = void 0;
exports.UTC1970Years = BigInt(62135596800000);
class buffer_saver {
    constructor() {
        this.file_buffer = [];
    }
    getBuffer() {
        return Buffer.concat(this.file_buffer);
    }
    buffer_write(buf) {
        this.file_buffer.push(buf);
    }
    addBool(val) {
        const buf = Buffer.allocUnsafe(1);
        buf.writeUInt8(Number(val), 0);
        this.file_buffer.push(buf);
    }
    addByte(val) {
        const buf = Buffer.allocUnsafe(1);
        buf.writeUInt8(val, 0);
        this.file_buffer.push(buf);
    }
    addShort(val) {
        const buf = Buffer.allocUnsafe(2);
        buf.writeUInt16LE(val, 0);
        this.file_buffer.push(buf);
    }
    addInt(val) {
        const buf = Buffer.allocUnsafe(4);
        buf.writeInt32LE(val, 0);
        this.file_buffer.push(buf);
    }
    addUInt(val) {
        const buf = Buffer.allocUnsafe(4);
        buf.writeUInt32LE(val, 0);
        this.file_buffer.push(buf);
    }
    addLong(val) {
        const buf = Buffer.allocUnsafe(8);
        buf.writeBigInt64LE(val, 0);
        this.file_buffer.push(buf);
    }
    addDouble(val) {
        const buf = Buffer.allocUnsafe(8);
        buf.writeDoubleLE(val, 0);
        this.file_buffer.push(buf);
    }
    addSingle(val) {
        const buf = Buffer.allocUnsafe(4);
        buf.writeFloatLE(val, 0);
        this.file_buffer.push(buf);
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
