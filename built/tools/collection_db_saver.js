"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collection_db_save = void 0;
const fs_1 = require("fs");
const buffer_saver_1 = require("./buffer_saver");
const collection_db_save = (collections, output_path) => {
    let buffer = new buffer_saver_1.buffer_saver();
    buffer.addInt(collections.osu_version);
    buffer.addInt(collections.collections.length);
    for (let collection of collections.collections) {
        buffer.addString(collection.name);
        buffer.addInt(collection.beatmaps_md5.length);
        for (let md5_hash of collection.beatmaps_md5) {
            buffer.addString(md5_hash);
        }
    }
    (0, fs_1.writeFileSync)(output_path, buffer.getBuffer(), { encoding: 'binary' });
    console.log('collection saved successfully');
};
exports.collection_db_save = collection_db_save;
