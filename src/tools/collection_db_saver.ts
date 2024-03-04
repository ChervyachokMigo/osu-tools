import { writeFileSync } from "fs";

import { buffer_saver } from "./buffer_saver";
import { collection_db_results } from "../consts/collection_db_results";


export const collection_db_save = ( collections: collection_db_results, output_path: string ) => {
	let buffer = new buffer_saver();
    buffer.addInt(collections.osu_version as number);
	buffer.addInt(collections.collections.length);

	for ( let collection of collections.collections) {
		buffer.addString(collection.name);
		buffer.addInt(collection.beatmaps_md5.length);
		for (let md5_hash of collection.beatmaps_md5){
            buffer.addString(md5_hash);
        }
	}
	

    writeFileSync( output_path, buffer.getBuffer(), { encoding: 'binary'});

    console.log('collection saved successfully');

}