"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockType = exports.beatmap_block_type_defaults = void 0;
exports.beatmap_block_type_defaults = {
    is_general_block: false,
    is_metadata_block: false,
    is_editor_block: false,
    is_difficulty_block: false,
    is_event_block: false,
    is_timing_points_block: false,
    is_color_block: false,
    is_hit_objects_block: false
};
function getBlockType(row) {
    let beatmap_block_type = Object.assign({}, exports.beatmap_block_type_defaults);
    if (row.startsWith('[General]')) {
        beatmap_block_type.is_general_block = true;
    }
    if (row.startsWith('[Editor]')) {
        beatmap_block_type.is_editor_block = true;
    }
    if (row.startsWith('[Metadata]')) {
        beatmap_block_type.is_metadata_block = true;
    }
    if (row.startsWith('[Difficulty]')) {
        beatmap_block_type.is_difficulty_block = true;
    }
    if (row.startsWith('[Events]')) {
        beatmap_block_type.is_event_block = true;
    }
    if (row.startsWith('[TimingPoints]')) {
        beatmap_block_type.is_timing_points_block = true;
    }
    if (row.startsWith('[Colours]')) {
        beatmap_block_type.is_color_block = true;
    }
    if (row.startsWith('[HitObjects]')) {
        beatmap_block_type.is_hit_objects_block = true;
    }
    return beatmap_block_type;
}
exports.getBlockType = getBlockType;
