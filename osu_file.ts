import fs from 'fs';
import path from 'path';
import { Buffer_parse } from './Buffer_parse';
import { osu_file_type } from './osu_file_type';

export class osu_file {
    public file_handle: any;
    public file_basename: string;
    public file_path: string;
    public file_type: osu_file_type;
    public parse_settings: Array<any>;
    public buff: Buffer_parse;

    constructor(file_path: string, parse_settings?: Array<any>) {
        this.file_type = osu_file_type.none;
        this.file_path = file_path;
        this.file_basename = path.basename(file_path);

        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }

        if (typeof parse_settings === 'undefined'){
            this.parse_settings = [];
        } else {
            this.parse_settings = parse_settings;
        }

        try {
            this.file_handle = fs.openSync(`${file_path}`, 'r');
            this.buff = new Buffer_parse(this.file_handle);
        } catch (error) {
            console.log(error);
            throw new Error('can not open osu file');
        }
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
            return false;
        }
    }

    set_parse_settings(parse_settings: Array<any>) {
        if (parse_settings && parse_settings.length > 0) {
            this.parse_settings = parse_settings;
        } else {
            throw new Error('wrong parse settings');
        }
    }

}
