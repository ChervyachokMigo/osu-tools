/// <reference types="node" />
/// <reference types="node" />
import { buffer_parse } from '../tools/buffer_parse';
export declare class raw_file {
    file_handle: number;
    file_basename: string;
    file_path: string;
    buff: buffer_parse;
    file_buffer: Buffer;
    file_size: number;
    constructor(file_path: string);
    free(): [number, number];
    close(): void;
}
//# sourceMappingURL=raw_file.d.ts.map