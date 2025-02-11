import Realm from "realm";
import { RealmObjectType } from '../consts/laser/RealmObjectType';
import { scanner_options } from "./scan_songs";
import { osu_file_beatmap_property } from "../consts/property_settings";
export declare const open_realm: (file_path: string) => Realm;
export declare const get_realm_objects: (realm: Realm, type: RealmObjectType) => Realm.Results<Realm.Object<import("realm/dist/public-types/namespace").DefaultObject, never> & import("realm/dist/public-types/namespace").DefaultObject>;
export declare const close_realm: () => void;
export declare const set_laser_files_path: (files_path: string) => void;
export declare const get_laser_beatmap_file: (hash: string, raw?: boolean, osu_file_beatmap_properties?: osu_file_beatmap_property[], options?: scanner_options) => string | import("..").beatmap_data;
export declare const get_laser_beatmap_file_path: (hash: string) => string;
//# sourceMappingURL=client_realm.d.ts.map