/// <reference types="node" />
import { StarRating, TimingPoint, WindowsTickRate } from '../consts/variable_types';
export declare const UTC1970Years: bigint;
export declare class buffer_saver {
    file_buffer: Buffer;
    cursor: number;
    last_bytes: number;
    constructor();
    getBuffer(): Buffer;
    buffer_write(val: Buffer): void;
    addBool(val: boolean): void;
    addByte(val: number): void;
    addShort(val: number): void;
    addInt(val: number): void;
    addUInt(val: number): void;
    addLong(val: bigint): void;
    addDouble(val: number): void;
    addSingle(val: number): void;
    addWindowTickrate(val: bigint): void;
    addWindowTickrateFromDate(val: WindowsTickRate): void;
    addULEB128(number: number): void;
    addString(val: string | Buffer): void;
    addStarRatings(arr: Array<StarRating>): void;
    addTimingPoints(arr: Array<TimingPoint>): void;
}
//# sourceMappingURL=buffer_saver.d.ts.map