import { osu_file } from './osu_file';
import { collection_db_results } from '../consts/collection_db_results';
export declare class collection_db extends osu_file {
    constructor(file_path: string);
    collection_db_parse(): collection_db_results;
}
/**
 * @returns collection_db_results with collections and beatmaps md5 hashes
 * @param collection_db_path - absolute path to collection.db
 * @also for detailed collection result use union with osu db - function `get_collections_detailed`
 */
export declare function collection_db_load(collection_db_path: string): collection_db_results;
//# sourceMappingURL=collection_db.d.ts.map