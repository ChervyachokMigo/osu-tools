/*var { Folder } = require('./index');

var f = Folder.path
console.log(getFiles({path: 'C:\\678'}))*/

import * as osu_db from './osu_db';

async function main() {
    await osu_db.osu_db_load('E:/osu!/osu!.db');
}

main();