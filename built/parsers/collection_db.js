"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection_db_load = exports.collection_db = void 0;
const osu_file_1 = require("./osu_file");
const osu_file_type_1 = require("../consts/osu_file_type");
class collection_db extends osu_file_1.osu_file {
    constructor(file_path) {
        super(file_path, []);
        this.file_type = osu_file_type_1.osu_file_type.collection_db;
    }
    collection_db_parse() {
        console.log('start parsing collection db..');
        let collection_db = {
            osu_version: this.buff.getInt(),
            collections: []
        };
        let collections_size = this.buff.getInt();
        if (collections_size == 0) {
            return collection_db;
        }
        for (let i = 0; i < collections_size; i++) {
            let current_collection = {
                name: this.buff.getString(),
                beatmaps_md5: []
            };
            let currect_collection_hashes_size = this.buff.getInt();
            if (currect_collection_hashes_size > 0) {
                for (let k = 0; k < currect_collection_hashes_size; k++) {
                    current_collection.beatmaps_md5.push(this.buff.getString());
                }
            }
            collection_db.collections.push(current_collection);
        }
        console.log('end parsing collection db');
        return collection_db;
    }
}
exports.collection_db = collection_db;
/**
 * @returns collection_db_results with collections and beatmaps md5 hashes
 * @param collection_db_path - absolute path to collection.db
 * @also for detailed collection result use union with osu db - function `get_collections_detailed`
 */
function collection_db_load(collection_db_path) {
    let result = { collections: [] };
    try {
        const collection_db_file = new collection_db(collection_db_path);
        result = collection_db_file.collection_db_parse();
        collection_db_file.close();
        return result;
    }
    catch (e) {
        console.log(e);
        return result;
    }
}
exports.collection_db_load = collection_db_load;
