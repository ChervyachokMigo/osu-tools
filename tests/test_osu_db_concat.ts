const path = require('path');

import { osu_db_save } from "../built";
import { osu_db_concat_sr }  from "../built/tools/osu_db_star_rating";

const downoaded_db_path = 'C:\\Users\\sadgod\\Downloads\\osu! (1)';
const osu_game_path = 'D:\\osu!';

const result = osu_db_concat_sr( {folder_path: osu_game_path}, {folder_path: downoaded_db_path});

console.log('[ saving ]');
osu_db_save(result, 'osu!.db');
