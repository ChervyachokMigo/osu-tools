import Realm, { Results } from "realm";
import path from "node:path";

import { RealmObjectType } from '../consts/laser/RealmObjectType';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { default_scanner_options, parse_osu_file, scanner_options } from "./scan_songs";
import { all_osu_file_properties, osu_file_beatmap_property } from "../consts/property_settings";
import { DefaultObject, RealmObject } from "realm/dist/public-types/namespace";
import { realm_file } from "../consts/laser/realm_file";
import { realm_beatmapset } from "../consts/laser/ream_beatmapset";
import { realm_beatmap } from "../consts/laser/realm_beatmap";

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

export const get_laser_beatmap_file = ( 
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

export const get_laser_beatmap_file_path = ( hash: string ) => {
	const second = hash.slice(0, 2);
	const first = second.slice(0, 1);
	const file_path = path.join(laser_files_path as string, first, second, hash );
	if (!existsSync(file_path)) {
        throw new Error(`Beatmap file ${file_path} not exists.`);
    }
	return file_path;
}

export type laser_file = {
	filename: string;
	filehash: string;
	filepath: string;
}

export const export_beatmapset = (beatmapsets: Results<RealmObject<DefaultObject> & DefaultObject>, ID: number, export_path: string, out_result = false) => {
	if (ID < 1) {
		throw new Error('Beatmapset ID must be greater than 0.');
	}

	const beatmapset = beatmapsets.find(v => v.OnlineID == ID );

	if (!beatmapset) {
		throw new Error(`Beatmapset with ID ${ID} not found.`);
	}

	const beatmap = (beatmapset.Beatmaps as Array<realm_beatmap>).find( v => v.Hash == beatmapset.Hash );

	if (!beatmap) {
		throw new Error(`Beatmap with hash ${beatmapset.Hash} not found.`);
	}

	const foldername = `${beatmapset.OnlineID} ${beatmap.Metadata.Artist} - ${beatmap.Metadata.Title}`;

	const beatmap_files: Array<laser_file> = (beatmapset.Files as  Array<realm_file>).map((v: realm_file) => {
		return {
			filename: v.Filename,
			filehash: v.File.Hash,
			filepath: get_laser_beatmap_file_path(v.File.Hash),
		}
	});

	for (let file of beatmap_files) {
        const dest_path = path.join(export_path, foldername, file.filename);
        if (!existsSync(path.dirname(dest_path))) {
            mkdirSync(path.dirname(dest_path), { recursive: true });
        }
        copyFileSync(file.filepath, dest_path);
		//console.log(`Exported ${file.filename} to ${dest_path}`);
    };

	if (out_result){
		console.log(`Exported beatmapset ${foldername}`);
	}

	return { foldername, exported_path: path.join(export_path, foldername), files: beatmap_files };
}