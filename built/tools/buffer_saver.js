"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer_saver = exports.UTC1970Years = void 0;
exports.UTC1970Years = BigInt(62135596800000);
class buffer_saver {
    constructor() {
        this.file_buffer = Buffer.alloc(0);
    }
    getBuffer() {
        return this.file_buffer;
    }
    buffer_write(val) {
        this.file_buffer = Buffer.concat([this.file_buffer, val], val.length + this.file_buffer.length);
    }
    addWindowTickrate(val) {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64LE(val, 0);
        this.buffer_write(buf);
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
        this.buffer_write(Buffer.from(Uint8Array.from(out)));
    }
    addString(val) {
        if (val.length > 0) {
            this.addByte(11);
            this.addULEB128(val.length);
            this.buffer_write(Buffer.from(val));
        }
        else {
            this.addByte(11);
            this.addByte(0);
        }
    }
    addBool(val) {
        let buf = Buffer.alloc(1);
        buf.writeUInt8(Number(val), 0);
        this.buffer_write(buf);
    }
    addByte(val) {
        let buf = Buffer.alloc(1);
        buf.writeUInt8(val, 0);
        this.buffer_write(buf);
    }
    addShort(val) {
        let buf = Buffer.alloc(2);
        buf.writeInt16LE(val, 0);
        this.buffer_write(buf);
    }
    addInt(val) {
        let buf = Buffer.alloc(4);
        buf.writeInt32LE(val, 0);
        this.buffer_write(buf);
    }
    addLong(val) {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64LE(val, 0);
        this.buffer_write(buf);
    }
    addDouble(val) {
        let buf = Buffer.alloc(8);
        buf.writeDoubleLE(val, 0);
        this.buffer_write(buf);
    }
}
exports.buffer_saver = buffer_saver;
