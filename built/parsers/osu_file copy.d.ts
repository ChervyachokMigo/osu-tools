/// <reference types="node" />
import { buffer_parse } from '../tools/buffer_parse';
import { osu_file_type } from '../consts/osu_file_type';
export declare class osu_file {
    file_handle: number;
    file_basename: string;
    file_path: string;
    file_type: osu_file_type;
    property_settings: Array<any>;
    buff: buffer_parse;
    file_buffer: Buffer;
    file_size: number;
    constructor(file_path: string, property_settings?: Array<any>);
    free(): [number, number];
    close(): void;
    get_type(): osu_file_type;
    set_type(): boolean;
    set_property_settings(property_settings: Array<any>): void;
}
//# sourceMappingURL=osu_file%20copy.d.ts.map