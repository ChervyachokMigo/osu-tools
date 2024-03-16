/// <reference types="node" />
export declare const UTC1970Years: bigint;
export declare class buffer_saver {
    file_buffer: Buffer;
    cursor: number;
    last_bytes: number;
    constructor();
    getBuffer(): Buffer;
    buffer_write(val: Buffer): void;
    addWindowTickrate(val: bigint): void;
    addWindowTickrateFromDate(val: Date): void;
    addULEB128(number: number): void;
    addString(val: string | Buffer): void;
    addBool(val: boolean): void;
    addByte(val: number): void;
    addShort(val: number): void;
    addInt(val: number): void;
    addLong(val: bigint): void;
    addDouble(val: number): void;
}
//# sourceMappingURL=buffer_saver.d.ts.map