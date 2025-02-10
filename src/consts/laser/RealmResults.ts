import { DefaultObject, RealmObject, Results } from "realm/dist/public-types/namespace";

export type RealmResults = Results<RealmObject<DefaultObject> & DefaultObject>;