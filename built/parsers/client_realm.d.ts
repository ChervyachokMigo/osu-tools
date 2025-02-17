import Realm, { Results } from "realm";
import { RealmObjectType } from '../consts/laser/RealmObjectType';
import { scanner_options } from "./scan_songs";
import { osu_file_beatmap_property } from "../consts/property_settings";
import { DefaultObject, RealmObject } from "realm/dist/public-types/namespace";
export declare const open_realm: (file_path: string) => Realm;
export declare const get_realm_objects: (realm: Realm, type: RealmObjectType) => Realm.Results<Realm.Object<DefaultObject, never> & DefaultObject>;
export declare const close_realm: () => void;
export declare const set_laser_files_path: (files_path: string) => void;
export declare const get_laser_beatmap_file: (hash: string, raw?: boolean, osu_file_beatmap_properties?: osu_file_beatmap_property[], options?: scanner_options) => string | import("..").beatmap_data;
export declare const get_laser_beatmap_file_path: (hash: string) => string;
export type laser_file = {
    filename: string;
    filehash: string;
    filepath: string;
};
export declare const find_beatmapset_files: (beatmapsets: Results<RealmObject<DefaultObject> & DefaultObject>, ID: number) => {
    foldername: string;
    files: laser_file[];
};
export declare const get_beatmapset_files: (beatmapset: RealmObject<DefaultObject> & DefaultObject) => {
    foldername: string;
    files: laser_file[];
};
export declare const export_beatmapset: (beatmapset: RealmObject<DefaultObject> & DefaultObject, export_path: string, out_result?: boolean) => {
    exported_path: string;
    foldername: string;
    files: laser_file[];
} | undefined;
//# sourceMappingURL=client_realm.d.ts.map