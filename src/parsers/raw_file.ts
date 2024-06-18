import {openSync, fstatSync, closeSync} from 'fs';
import * as path from 'path';
import { buffer_parse } from '../tools/buffer_parse';
import mmap from '@raygun-nickj/mmap-io';

export class raw_file {
    public file_handle: number;
    public file_basename: string;
    public file_path: string;

    public buff: buffer_parse;
    public file_buffer: Buffer;
    public file_size: number;

    constructor(file_path: string) {
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);

        try {
            this.file_handle = openSync(file_path, 'r');
            let fstats = fstatSync(this.file_handle);

            this.file_size = fstats.size;
            this.file_buffer = mmap.map(this.file_size, mmap.PROT_READ, mmap.MAP_PRIVATE, this.file_handle, 0, mmap.MADV_NORMAL);
            this.buff = new buffer_parse(this.file_handle, this.file_buffer);

        } catch (error) {
            console.log(error);
            throw new Error('can not open file');
        }
    }

    free(): [number, number] {
        return mmap.incore(this.file_buffer);
    }

    close(): void {
        return closeSync(this.file_handle);
    }

}
