import Realm from "realm";
import { RealmObjectType } from '../consts/laser/RealmObjectType';
export declare const open_realm: (file_path: string) => Realm;
export declare const get_realm_objects: (realm: Realm, type: RealmObjectType) => Realm.Results<Realm.Object<import("realm/dist/public-types/namespace").DefaultObject, never> & import("realm/dist/public-types/namespace").DefaultObject>;
export declare const close_realm: () => void;
//# sourceMappingURL=client_realm.d.ts.map