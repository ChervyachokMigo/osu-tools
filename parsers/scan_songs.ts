import { appendFileSync, fstat, fstatSync, opendirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";
import { beatmap_data } from "../consts/beatmap_data";
import md5File from 'md5-file';

export function ScanFolderForOsuFiles (osufolder: string) {
    try{
        const osu_songs = path.join(osufolder, "Songs");
        const files = readdirSync(osu_songs , { withFileTypes: true });

        var count = 0;

        for (const beatmap_folder of files) {
            console.log(count, '/', files.length);

            if (beatmap_folder.isDirectory()) {
               
                const beatmapset_files = readdirSync(path.join(osu_songs, beatmap_folder.name), { withFileTypes: true });

                if (beatmapset_files && beatmapset_files.length > 0) {

                    for (const beatmapset_file of beatmapset_files) {
                        

                        if ( beatmapset_file.isDirectory()) {
                            continue;
                        }

                        if (beatmapset_file.name.endsWith(".osu")) {
                            const osu_file_path = path.join(osu_songs, beatmap_folder.name, beatmapset_file.name);
                            const md5 = md5File.sync(osu_file_path);

                            const osu_file_data = parse_osu_file(osu_file_path);
                            osu_file_data.metadata.beatmap_md5 = md5;

                        }
                    }

                }
                


            }

            count ++;

        }
        

    } catch (error) {
        console.log(error);
        throw new Error('Error scanning folder');
    }
        
}

function parse_osu_file(osu_file_path: string): beatmap_data {
    const beatmap: beatmap_data = {
        general: {},
        editor: {},
        metadata: {},
        
    }

    const filedata = readFileSync(osu_file_path, {encoding: 'utf-8'});

    const rows = filedata.split('\n').filter(value => value.length > 0 && !value.startsWith('//') );
    
    var is_event_data = false;
    
    for (const row of rows){
        if (row.startsWith('[')){
            is_event_data = false;
        }
        if (row.startsWith('[Events]')){
            is_event_data = true;
        }

        if (is_event_data){
            if (row.startsWith('[')){
                continue
            }

            //let row_params = row.split(',');
            //event_type.push(row);
        }
    }

    return beatmap;
}

function onlyUnique (arr: Array<any>){
    return arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    })
}
