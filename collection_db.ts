
import { osu_file } from './osu_file';
import { osu_file_type } from './osu_file_type';
import { beatmap_results } from './beatmap_results';

export type collection = {
    name: string,
    md5_hashes: string[]
}

export type collection_db_results = {
    osu_version?: number,
    collections: collection[]
}

export type collection_db_detailed_results = {
    osu_version?: number,
    collections: collection_detailed[]
}

export type collection_detailed = {
    name: string,
    md5_hashes: string[],
    beatmaps: beatmap_results[]
}

export class collection_db extends osu_file {

    constructor(file_path: string){
        super(file_path, []);
    }

    public collection_db_parse(): collection_db_results {
        console.log('start parsing collection db..');

        let collection_db: collection_db_results = {
            osu_version: this.buff.getInt(),
            collections: []
        };

        let collections_size = this.buff.getInt();

        if (collections_size == 0) {
            return collection_db;
        }

        for (let i = 0; i < collections_size; i++) {
            let current_collection: collection = {
                name: this.buff.getString(), 
                md5_hashes: []
            };

            let currect_collection_hashes_size = this.buff.getInt();

            if (currect_collection_hashes_size > 0){
                for (let k = 0; k < currect_collection_hashes_size; k++){
                    current_collection.md5_hashes.push(this.buff.getString());
                }
            }
            collection_db.collections.push(current_collection);
        }

        console.log('end parsing collection db');

        return collection_db;
    }
}

/**
 * @returns collection_db_results with collections and beatmaps md5 hashes
 * @param collection_db_path - absolute path to collection.db
 * @also for detailed collection result use union with osu db - function `get_collections_detailed`
 */
export function collection_db_load(collection_db_path: string): collection_db_results {
    var file_parse_result: collection_db_results = { collections: [] };
    try{
        let collection_db_file = new collection_db(collection_db_path);
        switch (collection_db_file.get_type()){
            case osu_file_type.collection_db:
                file_parse_result = collection_db_file.collection_db_parse();
                break;
                default:
                    throw new Error('file type not osu file');
        }
        
        collection_db_file.close();

        return file_parse_result;
    } catch (e){
        console.log(e)
        return file_parse_result;
    }
}