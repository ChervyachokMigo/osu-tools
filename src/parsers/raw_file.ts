import {openSync, fstatSync, closeSync, readFileSync} from 'fs';
import * as path from 'path';
import { buffer_parse } from '../tools/buffer_parse';

export class raw_file {
    public file_basename: string;
    public file_path: string;

    public buff: buffer_parse;
    public file_buffer: Buffer;
    public file_size: number;

    constructor(file_path: string) {
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);

        try {
            const fd = openSync(file_path, 'r');
            const fstats = fstatSync(fd);
			closeSync(fd);
            this.file_size = fstats.size;
            this.file_buffer = readFileSync(file_path);
            this.buff = new buffer_parse(this.file_buffer);

        } catch (error) {
            console.log(error);
            throw new Error('can not open file');

        }
    }

}
