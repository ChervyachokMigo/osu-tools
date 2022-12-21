import { fstat, fstatSync, opendirSync, readdirSync } from "fs";
import path from "path";
import { beatmap_data } from "../consts/beatmap_data";
import md5File from 'md5-file';

function ScanFolderForOsuFiles (osufolder: string) {
    try{
        const osu_songs = path.join(osufolder, "Songs");
        const files = readdirSync(osu_songs , { withFileTypes: true });
        for (const beatmap_folder of files) {

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
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error scanning folder');

    }
    

}

function parse_osu_file(osu_file_path: string): beatmap_data {
    /*let beatmap_data: beatmap_data = {
        is_samples_match_playback_rate
    }*/
    //const osu_file_data: beatmap_data = {
        /*beatmap_md5: "",
        beatmap_name: "",
        beatmap_artist: "",
        beatmap_creator: "",
        beatmap_creator_url: "",
        beatmapset_md5: "",
        beatmapset_name: "",
        beatmapset_artist: "",
        beatmapset_creator: "",
        beatmapset_creator_url: "",
        beatmapset_url: "",
        beatmapset_cover_url: "",
        beatmapset_cover_art: "",
        beatmapset_cover_art_url: "",
        beatmapset_cover_art_art: "",
        beatmapset_cover_art_art_url: "",
        beatmapset_cover_art_art_art_url: "",
        beatmapset_cover_art_art_art_art_url: "",
        beatmapset_cover_art_art_art_art_art_url: "",
        beatmapset_cover_art_art_art_art_art_art_url*/

    throw new Error("Function not implemented.");
}
