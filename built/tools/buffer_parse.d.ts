/// <reference types="node" />
import { TimingPoint, StarRating, HP_Bar, ReplayData, WindowsTickRate } from '../consts/variable_types';
export declare const UTC1970Years: bigint;
export declare const verify_value: (obj: any) => void[];
export declare class buffer_parse {
    file_handle: number;
    cursor_offset: number;
    file_buffer: Buffer;
    constructor(file_handle: number, file_buffer: Buffer);
    bufferRead(length: number): Buffer;
    getBool(): boolean;
    skipBool(): void;
    getByte(): number;
    skipBytes(length: number): void;
    skipByte(): void;
    getShort(): number;
    skipShort(): void;
    getInt(): number;
    getUInt(): number;
    skipInt(): void;
    getLong(): bigint;
    skipLong(): void;
    getSingle(): number;
    skipSingle(): void;
    getDouble(): number;
    skipDouble(): void;
    getWindowsTickDate(): BigInt;
    getDateTime(): WindowsTickRate;
    skipDateTime(): void;
    getStarRatings(): Array<StarRating>;
    skipStarRatings(): void;
    getTimingPoints(): Array<TimingPoint>;
    skipTimingPoints(): void;
    getString(): string;
    getStringAsBuffer(): Buffer;
    skipString(): void;
    getULEB128(): number;
    getHpBar(): HP_Bar[];
    private getLZMAString;
    getReplayData(): ReplayData;
}
//# sourceMappingURL=buffer_parse.d.ts.map