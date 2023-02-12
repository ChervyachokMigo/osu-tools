/// <reference types="node" />
import { TimingPoint, StarRating, HP_Bar, ReplayData } from '../consts/variable_types';
export declare class buffer_parse {
    file_handle: number;
    cursor_offset: number;
    file_buffer: Buffer;
    constructor(file_handle: number, file_buffer: Buffer);
    bufferRead(length: number): Buffer;
    getDateTime(): Date;
    skipDateTime(): void;
    getBool(): boolean;
    skipBool(): void;
    getByte(): number;
    skipBytes(length: number): void;
    skipByte(): void;
    getShort(): number;
    skipShort(): void;
    getLong(): bigint;
    skipLong(): void;
    getInt(): number;
    skipInt(): void;
    getStarRatings(): Array<StarRating>;
    skipStarRatings(): void;
    getTimingPoints(): Array<TimingPoint>;
    skipTimingPoints(): void;
    getSingle(): number;
    skipSingle(): void;
    getDouble(): number;
    skipDouble(): void;
    getString(): string;
    skipString(): void;
    getULEB128(): number;
    getHpBar(): HP_Bar[];
    private getLZMAString;
    getReplayData(): ReplayData;
}
//# sourceMappingURL=buffer_parse.d.ts.map