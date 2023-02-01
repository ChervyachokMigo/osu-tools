"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_beatmaps_from_beatmap_folder = exports.get_all_beatmaps_from_songs = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const beatmap_data_1 = require("../consts/beatmap_data");
const md5_file_1 = __importDefault(require("md5-file"));
const beatmap_block_1 = require("../consts/beatmap_block");
const variable_types_1 = require("../consts/variable_types");
const bitwise_1 = __importDefault(require("bitwise"));
const property_settings_1 = require("../consts/property_settings");
function get_all_beatmaps_from_songs(osufolder, osu_file_beatmap_properties) {
    console.log('scan starting..');
    try {
        const osu_songs = path_1.default.join(osufolder, "Songs");
        const files = (0, fs_1.readdirSync)(osu_songs, { withFileTypes: true });
        var count = 0;
        console.time('thousand');
        var beatmaps = [];
        for (const beatmap_folder of files) {
            if (count % 1000 == 0) {
                console.log(count, '/', files.length);
                console.timeEnd('thousand');
                console.time('thousand');
            }
            if (beatmap_folder.isDirectory()) {
                beatmaps = beatmaps.concat(get_beatmaps_from_beatmap_folder(osufolder, beatmap_folder.name, osu_file_beatmap_properties));
            }
            count++;
        }
        console.log('scan complete');
        return beatmaps;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error scanning folder');
    }
}
exports.get_all_beatmaps_from_songs = get_all_beatmaps_from_songs;
function get_beatmaps_from_beatmap_folder(osufolder, folder_path, osu_file_beatmap_properties) {
    const osu_songs = path_1.default.join(osufolder, "Songs");
    var beatmaps = [];
    try {
        const beatmapset_files = (0, fs_1.readdirSync)(path_1.default.join(osu_songs, folder_path), { withFileTypes: true });
        if (beatmapset_files && beatmapset_files.length > 0) {
            for (const beatmapset_file of beatmapset_files) {
                if (beatmapset_file.isDirectory()) {
                    continue;
                }
                if (beatmapset_file.name.endsWith(".osu")) {
                    const osu_file_path = path_1.default.join(osu_songs, folder_path, beatmapset_file.name);
                    const md5 = md5_file_1.default.sync(osu_file_path);
                    const osu_file_data = parse_osu_file(osu_file_path, osu_file_beatmap_properties);
                    osu_file_data.metadata.beatmap_md5 = md5;
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
function parse_osu_file(osu_file_path, osu_file_beatmap_properties) {
    const beatmap = {
        general: {},
        editor: {},
        metadata: {},
        difficulty: {},
        events: [],
        timing_points: [],
        colors: [],
        hit_objects: []
    };
    const filedata = (0, fs_1.readFileSync)(osu_file_path, { encoding: 'utf-8' });
    const rows = filedata.split('\n')
        .filter((value) => value.length > 0 && !value.startsWith('//'));
    var beatmap_block_type = Object.assign({}, beatmap_block_1.beatmap_block_type_defaults);
    for (const row of rows) {
        if (row.startsWith('[')) {
            beatmap_block_type = (0, beatmap_block_1.getBlockType)(row);
            continue;
        }
        //[General] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.general_block) != -1
            && beatmap_block_type.is_general_block) {
            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name = row_splitted[0].toLowerCase().trim();
                let row_value = row_splitted[1].trim();
                if (row_name.startsWith('audiofilename')) {
                    beatmap.general.audio_filename = row_value;
                }
                if (row_name.startsWith('audioleadin')) {
                    beatmap.general.audio_lead_in = Number(row_value);
                }
                if (row_name.startsWith('audiohash')) {
                    beatmap.general.audio_hash = row_value;
                }
                if (row_name.startsWith('previewtime')) {
                    beatmap.general.preview_time = Number(row_value);
                }
                if (row_name.startsWith('countdown')) {
                    beatmap.general.countdown = Number(row_value);
                }
                if (row_name.startsWith('sampleset')) {
                    beatmap.general.sample_set = row_value;
                }
                if (row_name.startsWith('stackleniency')) {
                    beatmap.general.stack_leniency = Number(row_value);
                }
                if (row_name.startsWith('mode')) {
                    beatmap.general.gamemode = Number(row_value);
                }
                if (row_name.startsWith('letterboxinbreaks')) {
                    beatmap.general.is_letterbox_in_break = Boolean(row_value);
                }
                if (row_name.startsWith('storyfireinfront')) {
                    beatmap.general.is_storyfire_in_front = Boolean(row_value);
                }
                if (row_name.startsWith('useskinsprites')) {
                    beatmap.general.is_use_skin_sprites = Boolean(row_value);
                }
                if (row_name.startsWith('alwaysshowplayfield')) {
                    beatmap.general.is_always_show_playfield = Boolean(row_value);
                }
                if (row_name.startsWith('overlayposition')) {
                    beatmap.general.overlay_position = row_value;
                }
                if (row_name.startsWith('skinpreference')) {
                    beatmap.general.skin_preference = row_value;
                }
                if (row_name.startsWith('epilepsywarning')) {
                    beatmap.general.is_epilepsy_warning = Boolean(row_value);
                }
                if (row_name.startsWith('countdownoffset')) {
                    beatmap.general.countdown_offset = Number(row_value);
                }
                if (row_name.startsWith('specialstyle')) {
                    beatmap.general.is_special_style = Boolean(row_value);
                }
                if (row_name.startsWith('widescreenstoryboard')) {
                    beatmap.general.is_widescreen_storyboard = Boolean(row_value);
                }
                if (row_name.startsWith('samplesmatchplaybackrate')) {
                    beatmap.general.is_samples_match_playback_rate = Boolean(row_value);
                }
            }
        }
        //[Editor] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.editor_block) != -1 &&
            beatmap_block_type.is_editor_block) {
            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name = row_splitted[0].toLowerCase().trim();
                let row_value = row_splitted[1].trim();
                if (row_name.startsWith('bookmarks')) {
                    beatmap.editor.bookmarks = row_value.split(',')
                        .map(value => Number(value.trim()))
                        .filter(value => !isNaN(value) && value > 0);
                }
                if (row_name.startsWith('distancespacing')) {
                    beatmap.editor.distance_snapping = Number(row_value);
                }
                if (row_name.startsWith('beatdivisor')) {
                    beatmap.editor.beat_divisor = Number(row_value);
                }
                if (row_name.startsWith('gridsize')) {
                    beatmap.editor.grid_size = Number(row_value);
                }
                if (row_name.startsWith('timelinezoom')) {
                    beatmap.editor.timeline_zoom = Number(row_value);
                }
            }
        }
        //[Metadata] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.metadata_block) != -1 &&
            beatmap_block_type.is_metadata_block) {
            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name = row_splitted[0].toLowerCase().trim();
                let row_value = row_splitted[1].trim();
                if (row_name === 'title') {
                    beatmap.metadata.title = row_value;
                }
                if (row_name === 'titleunicode') {
                    beatmap.metadata.title_unicode = row_value;
                }
                if (row_name === 'artist') {
                    beatmap.metadata.artist = row_value;
                }
                if (row_name === 'artistunicode') {
                    beatmap.metadata.artist_unicode = row_value;
                }
                if (row_name.startsWith('creator')) {
                    beatmap.metadata.creator = row_value;
                }
                if (row_name.startsWith('version')) {
                    beatmap.metadata.version = row_value;
                }
                if (row_name.startsWith('source')) {
                    beatmap.metadata.source = row_value;
                }
                if (row_name.startsWith('tags')) {
                    beatmap.metadata.tags = row_value.split(' ')
                        .filter(value => value.length > 0);
                }
                if (row_name.startsWith('beatmapid')) {
                    beatmap.metadata.beatmap_id = Number(row_value);
                }
                if (row_name.startsWith('beatmapsetid')) {
                    beatmap.metadata.beatmapset_id = Number(row_value);
                }
            }
        }
        //[Difficulty] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.difficulty_block) != -1 &&
            beatmap_block_type.is_difficulty_block) {
            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name = row_splitted[0].toLowerCase().trim();
                let row_value = row_splitted[1].trim();
                if (row_name.startsWith('hpdrainrate')) {
                    beatmap.difficulty.Health_Points_drain_rate = Number(row_value);
                }
                if (row_name.startsWith('circlesize')) {
                    beatmap.difficulty.Circle_Size = Number(row_value);
                }
                if (row_name.startsWith('overalldifficulty')) {
                    beatmap.difficulty.Overall_Difficulty = Number(row_value);
                }
                if (row_name.startsWith('approachrate')) {
                    beatmap.difficulty.Approach_Rate = Number(row_value);
                }
                if (row_name.startsWith('slidermultiplier')) {
                    beatmap.difficulty.slider_multiplier = Number(row_value);
                }
                if (row_name.startsWith('slidertickrate')) {
                    beatmap.difficulty.slider_tick_rate = Number(row_value);
                }
            }
        }
        //[Events] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.events_block) != -1 &&
            beatmap_block_type.is_event_block) {
            let row_escaped = row.replace('\r', '');
            if (row_escaped.length >= 1) {
                beatmap.events.push(row_escaped);
            }
        }
        //[TimingPoints] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.timing_points_block) != -1 &&
            beatmap_block_type.is_timing_points_block) {
            let row_splitted = row.replace('\r', '').split(',');
            if (row_splitted.length >= 2) {
                let timing_point = {
                    time_offset: Number(row_splitted[0]),
                    beat_length: Number(row_splitted[1]),
                    meter: row_splitted[2] ? Number(row_splitted[2]) : 0,
                    sample_set: row_splitted[3] ? Number(row_splitted[3]) : 0,
                    sample_index: row_splitted[4] ? Number(row_splitted[4]) : 0,
                    volume: row_splitted[5] ? Number(row_splitted[5]) : 0,
                    uninherited: row_splitted[6] ? Boolean(row_splitted[6]) : false,
                    effects: {
                        is_kiai: row_splitted[7] ? Boolean(bitwise_1.default.integer.getBit(Number(row_splitted[7]), 0)) : false,
                        is_first_barline: row_splitted[7] ? Boolean(bitwise_1.default.integer.getBit(Number(row_splitted[7]), 3)) : false,
                    }
                };
                beatmap.timing_points.push(timing_point);
            }
        }
        //[Colours] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.colors_block) != -1 &&
            beatmap_block_type.is_color_block) {
            let row_splitted = row.split(':');
            if (row_splitted.length >= 2) {
                let row_name = row_splitted[0].toLowerCase().trim();
                let row_value = row_splitted[1].trim();
                if (row_name.startsWith('color') ||
                    row_name.startsWith('slidertrackoverride') ||
                    row_name.startsWith('sliderborder')) {
                    let color_type = beatmap_data_1.beatmap_color_type[row_name];
                    let colors_components = row_value.split(',').map(value => value.trim());
                    let color = {
                        type: color_type,
                        red: Number(colors_components[0]),
                        green: Number(colors_components[1]),
                        blue: Number(colors_components[2])
                    };
                    beatmap.colors.push(color);
                }
            }
        }
        //[HitObjects] block
        if (osu_file_beatmap_properties.indexOf(property_settings_1.osu_file_beatmap_property.hit_objects_block) != -1 &&
            beatmap_block_type.is_hit_objects_block) {
            let row_splitted = row.replace('\r', '').split(',');
            if (row_splitted.length >= 5) {
                let type = 0;
                if (bitwise_1.default.integer.getBit(Number(row_splitted[3]), 0) == 1) {
                    type = beatmap_data_1.beatmap_data_hit_object_type.hitcircle;
                }
                if (bitwise_1.default.integer.getBit(Number(row_splitted[3]), 1) == 1) {
                    type = beatmap_data_1.beatmap_data_hit_object_type.slider;
                }
                if (bitwise_1.default.integer.getBit(Number(row_splitted[3]), 3) == 1) {
                    type = beatmap_data_1.beatmap_data_hit_object_type.spinner;
                }
                if (bitwise_1.default.integer.getBit(Number(row_splitted[3]), 7) == 1) {
                    type = beatmap_data_1.beatmap_data_hit_object_type.mania_hold;
                }
                let hit_sample = {};
                let hit_sample_row = row_splitted.pop();
                if (hit_sample_row) {
                    if (hit_sample_row.length >= 5) {
                        let hit_sample_splitted = hit_sample_row.split(':');
                        hit_sample.normal_set = Number(hit_sample_splitted[0]);
                        hit_sample.addition_set = Number(hit_sample_splitted[1]);
                        hit_sample.index = Number(hit_sample_splitted[2]);
                        hit_sample.volume = Number(hit_sample_splitted[3]);
                        hit_sample.filename = hit_sample_splitted[4];
                    }
                    else {
                        row_splitted.push(hit_sample_row);
                    }
                }
                let is_new_combo = Boolean(bitwise_1.default.integer.getBit(Number(row_splitted[3]), 2));
                let hit_object = {
                    x: Number(row_splitted[0]),
                    y: Number(row_splitted[1]),
                    time: Number(row_splitted[2]),
                    type: type,
                    is_new_combo: is_new_combo,
                    hit_sound: Number(row_splitted[4]),
                    object_params: row_splitted.slice(5).join(','),
                    hit_sample: hit_sample
                };
                if (is_new_combo) {
                    let skip_colors_bits = [
                        Number(bitwise_1.default.integer.getBit(Number(row_splitted[3]), 4)),
                        Number(bitwise_1.default.integer.getBit(Number(row_splitted[3]), 5)),
                        Number(bitwise_1.default.integer.getBit(Number(row_splitted[3]), 6))
                    ];
                    hit_object.new_combo_colors_skip = parseInt(`${skip_colors_bits[0]}${skip_colors_bits[1]}${skip_colors_bits[2]}`, 2);
                }
                beatmap.hit_objects.push(hit_object);
            }
        }
        //end for loop
    }
    //set defaults
    //[General] block
    if (beatmap.general.audio_lead_in === undefined) {
        beatmap.general.audio_lead_in = 0;
    }
    if (beatmap.general.preview_time === undefined) {
        beatmap.general.preview_time = -1;
    }
    if (beatmap.general.countdown === undefined) {
        beatmap.general.countdown = beatmap_data_1.beatmap_countdown.normal;
    }
    if (beatmap.general.sample_set === undefined) {
        beatmap.general.sample_set = beatmap_data_1.beatmap_sample_set.Normal;
    }
    if (beatmap.general.stack_leniency === undefined) {
        beatmap.general.stack_leniency = 0.7;
    }
    if (beatmap.general.gamemode === undefined) {
        beatmap.general.gamemode = variable_types_1.Gamemode.osu;
    }
    if (beatmap.general.is_letterbox_in_break === undefined) {
        beatmap.general.is_letterbox_in_break = false;
    }
    if (beatmap.general.is_storyfire_in_front === undefined) {
        beatmap.general.is_storyfire_in_front = true;
    }
    if (beatmap.general.is_use_skin_sprites === undefined) {
        beatmap.general.is_use_skin_sprites = false;
    }
    if (beatmap.general.is_always_show_playfield === undefined) {
        beatmap.general.is_always_show_playfield = false;
    }
    if (beatmap.general.overlay_position === undefined) {
        beatmap.general.overlay_position = beatmap_data_1.beatmap_overlay_position.NoChange;
    }
    if (beatmap.general.is_epilepsy_warning === undefined) {
        beatmap.general.is_epilepsy_warning = false;
    }
    if (beatmap.general.countdown_offset === undefined) {
        beatmap.general.countdown_offset = 0;
    }
    if (beatmap.general.is_special_style === undefined) {
        beatmap.general.is_special_style = false;
    }
    if (beatmap.general.is_widescreen_storyboard === undefined) {
        beatmap.general.is_widescreen_storyboard = false;
    }
    if (beatmap.general.is_samples_match_playback_rate === undefined) {
        beatmap.general.is_samples_match_playback_rate = false;
    }
    return beatmap;
}
function onlyUnique(arr) {
    return arr.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
}
