import * as fs from 'fs';
import * as path from 'path';
import { buffer_parse } from '../tools/buffer_parse';
import { osu_file_type } from '../consts/osu_file_type';
import mmap from '@raygun-nickj/mmap-io';
import { raw_file } from './raw_file';

export class osu_file extends raw_file {

    public file_type: osu_file_type;
    public property_settings: Array<any>;

	constructor(file_path: string, property_settings?: any[] ){
		super(file_path);

		this.file_type = osu_file_type.none;

        if (!this.set_type()) {
            throw new Error('wrong file type. It not osu file');
        }

        if (typeof property_settings === 'undefined'){
            this.property_settings = [];
        } else {
            this.property_settings = property_settings;
        }

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
