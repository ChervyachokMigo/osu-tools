import fs from 'fs';
import path from 'path';
import { buffer_parse } from '../tools/buffer_parse';
import { osu_file_type } from '../consts/osu_file_type';
import mmap from '@raygun-nickj/mmap-io';

export class osu_file {
    public file_handle: number;
    public file_basename: string;
    public file_path: string;
    public file_type: osu_file_type;
    public property_settings: Array<any>;
    public buff: buffer_parse;
    public file_buffer: Buffer;
    public file_size: number;

    constructor(file_path: string, property_settings?: Array<any>) {
        this.file_type = osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);

        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }

        if (typeof property_settings === 'undefined'){
            this.property_settings = [];
        } else {
            this.property_settings = property_settings;
        }

        try {

            this.file_handle = fs.openSync(file_path, 'r');
            let fstats = fs.fstatSync(this.file_handle);

            this.file_size = fstats.size;
            this.file_buffer = mmap.map(this.file_size, mmap.PROT_READ, mmap.MAP_PRIVATE, this.file_handle, 0, mmap.MADV_NORMAL);
            this.buff = new buffer_parse(this.file_handle, this.file_buffer);

        } catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
    }

    free(): [number, number] {
        return mmap.incore(this.file_buffer);
    }

    close(): void {
        return fs.closeSync(this.file_handle);
    }

    get_type(): osu_file_type {
        return this.file_type;
    }

    set_type(): boolean {
        if (path.extname(this.file_basename) === '.db') {

            if (this.file_basename.startsWith(osu_file_type.osu_db)) {
                this.file_type = osu_file_type.osu_db;
            } else {
                switch (this.file_basename) {
                    case osu_file_type.collection_db:
                        this.file_type = osu_file_type.collection_db;
                        break;
                    case osu_file_type.scores_db:
                        this.file_type = osu_file_type.scores_db;
                        break;
                }
            }

            if (this.file_type === osu_file_type.none) {
                return false;
            }

            return true;

        } else {

            if (path.extname(this.file_basename) === '.osr') {
                this.file_type = osu_file_type.replay_osr;

                return true;
            } 
        }

        return false;
    }

    set_property_settings(property_settings: Array<any>) {
        if (property_settings && property_settings.length > 0) {
            this.property_settings = property_settings;
        } else {
            throw new Error('wrong parse settings');
        }
    }

}
