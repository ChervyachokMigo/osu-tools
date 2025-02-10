import Realm from "realm";
import path from "path";

import { RealmObjectType } from '../consts/laser/RealmObjectType';
import { existsSync, readFileSync } from "fs";
import { default_scanner_options, parse_osu_file, scanner_options } from "./scan_songs";
import { all_osu_file_properties, osu_file_beatmap_property } from "../consts/property_settings";

let realm: Realm | null = null;
let laser_files_path: string | null = null;

export const open_realm = (file_path: string) => {
	realm = new Realm({

		path: file_path,
		readOnly: true,
		
	});
	return realm;
}

export const get_realm_objects = (realm: Realm, type: RealmObjectType) => {
	return (realm as Realm).objects(type);
}

export const close_realm = () => {
	Realm.shutdown();
}

export const set_laser_files_path = (files_path: string) => {
	const files_path_parsed = path.parse(files_path)
	let storage_path: string | null = null;
	if (files_path_parsed.name === 'files') {
		storage_path = files_path;
	} else {
		const path_with_files = path.join(files_path, 'files');
		if (existsSync(path_with_files)) {
			storage_path = path_with_files;
		} else {
			throw new Error(`osu laser files ${path_with_files} not exists.`);
		}
	}
	laser_files_path = storage_path;
}

export const get_beatmap_file = ( 
	hash: string, 
	raw = true, 
	osu_file_beatmap_properties: osu_file_beatmap_property[] = all_osu_file_properties,
	options: scanner_options = default_scanner_options  ) => {
	const second = hash.slice(0, 2);
	const first = second.slice(0, 1);
	const file_path = path.join(laser_files_path as string, first, second, hash );
	if (!existsSync(file_path)) {
        throw new Error(`Beatmap file ${file_path} not exists.`);
    }
	if (raw) {
		return readFileSync(file_path, {encoding: 'utf-8'});;
	} else {
		return parse_osu_file(file_path, osu_file_beatmap_properties, options);
	}
}