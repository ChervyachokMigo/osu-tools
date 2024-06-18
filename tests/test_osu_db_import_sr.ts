const path = require('path');

import { osu_db_import_sr }  from "../built/tools/osu_db_star_rating";

const downoaded_db_path = 'C:\\Users\\sadgod\\Downloads\\osu! (1)';
const osu_game_path = 'D:\\osu!';
const osu_tools_path = 'F:\\node_js_stuff\\node_projects\\osu-tools'

osu_db_import_sr('srs.raw', { folder_path: osu_game_path }, { folder_path: osu_tools_path });

