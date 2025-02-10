import Realm from "realm";
import { RealmObjectType } from '../consts/laser/RealmObjectType';

export const open_realm = (file_path: string) => {
	const realm = new Realm({

		path: file_path,
		readOnly: true,
		
	});
	return realm;
}

export const get_realm_objects = (realm: Realm, type: RealmObjectType) => {
	return realm.objects(type);
}

export const close_realm = () => {
	Realm.shutdown();
}