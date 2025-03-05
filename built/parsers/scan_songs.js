"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_beatmaps_from_beatmap_folder = exports.songs_get_all_beatmaps = exports.default_scanner_options = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const property_settings_1 = require("../consts/property_settings");
const glob_1 = require("glob");
const display_progress_1 = require("../tools/display_progress");
const parse_osu_file_1 = require("./parse_osu_file");
exports.default_scanner_options = {
    is_read_only: false,
    is_hit_objects_only_count: true,
    songs_folder: 'Songs',
    is_display_complete_time: false,
    is_check_osb: true,
    is_parse_sliders: false,
    is_print_progress: true
};
function songs_get_all_beatmaps(osufolder, osu_file_beatmap_properties, options, callback) {
    if (typeof options.is_read_only === 'undefined')
        options.is_read_only = false;
    if (typeof options.is_hit_objects_only_count === 'undefined')
        options.is_hit_objects_only_count = true;
    if (typeof options.songs_folder === 'undefined')
        options.songs_folder = 'Songs';
    if (typeof options.is_display_complete_time === 'undefined')
        options.is_display_complete_time = false;
    if (typeof options.is_check_osb === 'undefined')
        options.is_check_osb = true;
    if (typeof options.is_parse_sliders === 'undefined')
        options.is_parse_sliders = false;
    if (typeof options.is_print_progress === 'undefined')
        options.is_print_progress = true;
    console.assert(options.is_hit_objects_only_count == true &&
        osu_file_beatmap_properties.includes(property_settings_1.osu_file_beatmap_property.hit_objects_count), 'WARNING: hit_objects count will be null, set on "hit_objects_count" propery!');
    console.log('scan starting..');
    const songs = options.songs_folder;
    try {
        const osu_songs = path_1.default.join(osufolder, songs);
        const files = (0, glob_1.globSync)(osu_songs + '/*/', {
            absolute: false,
            cwd: osu_songs
        });
        let count = 0;
        let beatmaps = [];
        //display variables
        const one_percent_value = Math.trunc(files.length / 100);
        (0, display_progress_1.display_progress_reset)();
        const is_display_complete_time = typeof options.is_display_complete_time === 'undefined' ? true : options.is_display_complete_time;
        for (const beatmap_folder of files) {
            if ((0, fs_1.existsSync)(path_1.default.join(osu_songs, beatmap_folder)) && (0, fs_1.lstatSync)(path_1.default.join(osu_songs, beatmap_folder)).isDirectory()) {
                let current_beatmaps = get_beatmaps_from_beatmap_folder(osufolder, beatmap_folder, osu_file_beatmap_properties, options);
                callback(current_beatmaps, beatmap_folder);
                if (options.is_read_only === false) {
                    beatmaps = beatmaps.concat(current_beatmaps);
                }
                else {
                    current_beatmaps = [];
                }
            }
            if (options.is_print_progress && count % one_percent_value == 0) {
                (0, display_progress_1.display_progress)({
                    counter: count,
                    one_percent: one_percent_value,
                    length: files.length,
                    is_print_progress: options.is_print_progress,
                    is_display_time: is_display_complete_time
                });
            }
            count++;
        }
        console.log('');
        console.log('scan complete');
        return beatmaps;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error scanning folder');
    }
}
exports.songs_get_all_beatmaps = songs_get_all_beatmaps;
function get_beatmaps_from_beatmap_folder(osufolder, folder_path, osu_file_beatmap_properties, options) {
    const songs = options.songs_folder || 'Songs';
    const osu_songs = path_1.default.join(osufolder, songs);
    var beatmaps = [];
    const is_check_osb = typeof options.is_check_osb === 'undefined' ? true : options.is_check_osb;
    try {
        const current_folder = path_1.default.join(osu_songs, folder_path);
        const beatmapset_files = (0, glob_1.globSync)(current_folder + '/**/*', {
            absolute: false,
            cwd: current_folder
        });
        if (beatmapset_files && beatmapset_files.length > 0) {
            for (const beatmapset_file of beatmapset_files) {
                if ((0, fs_1.existsSync)(path_1.default.join(current_folder, beatmapset_file)) && (0, fs_1.lstatSync)(path_1.default.join(current_folder, beatmapset_file)).isDirectory()) {
                    continue;
                }
                if (beatmapset_file.toLowerCase().endsWith(".osu") ||
                    (is_check_osb && beatmapset_file.toLowerCase().endsWith(".osb"))) {
                    const osu_file_path = path_1.default.join(osu_songs, folder_path, beatmapset_file);
                    const osu_file_data = (0, parse_osu_file_1.parse_osu_file)(osu_file_path, osu_file_beatmap_properties, options);
                    beatmaps.push(osu_file_data);
                }
            }
        }
        return beatmaps;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error open folder');
    }
}
exports.get_beatmaps_from_beatmap_folder = get_beatmaps_from_beatmap_folder;
