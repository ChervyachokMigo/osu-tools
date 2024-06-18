const path = require('path');

import { osu_db_export_sr }  from "../built/tools/osu_db_star_rating";

const downoaded_db_path = 'C:\\Users\\sadgod\\Downloads\\osu! (1)';
const osu_game_path = 'D:\\osu!';

osu_db_export_sr({ folder_path: downoaded_db_path}, 'srs.raw');

