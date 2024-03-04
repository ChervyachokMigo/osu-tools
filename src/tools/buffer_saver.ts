
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
export class buffer_saver {

    file_buffer: Buffer;

    constructor( ) {
        this.file_buffer = Buffer.alloc(0);
    }

    getBuffer(): Buffer {
        return this.file_buffer;
    }

    buffer_write(val: Buffer): void  {
        this.file_buffer = Buffer.concat([this.file_buffer, val], val.length + this.file_buffer.length);
    }

    addWindowTickrate(val: bigint) {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64LE(val);
        this.buffer_write(buf);
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
            this.addByte(0x0b);
            this.addULEB128(val.length);
            this.buffer_write(Buffer.from(val));
        } else {
            this.addByte(0x0b);
            this.addByte(0);
        }
    }

    addBool(val: boolean): void {
        let buf = Buffer.alloc(1);
        buf.writeUInt8(Number(val));
        this.buffer_write(buf);
    }

    addByte(val: number): void {
        let buf = Buffer.alloc(1);
        buf.writeUInt8(val);
        this.buffer_write(buf);
    }

    addShort(val: number): void {
        let buf = Buffer.alloc(2);
        buf.writeUInt16LE(val);
        this.buffer_write(buf);
    }

    addInt(val: number): void {
        let buf = Buffer.alloc(4);
        buf.writeUInt32LE(val);
        this.buffer_write(buf);
    }

    addLong(val: bigint): void {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64LE(val);
        this.buffer_write(buf);
    }

    addDouble(val: number): void {
        let buf = Buffer.alloc(8);
        buf.writeDoubleLE(val);
        this.buffer_write(buf);
    }

   

}