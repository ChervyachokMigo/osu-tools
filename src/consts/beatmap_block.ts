
export type beatmap_block = {
    is_general_block: boolean;
    is_editor_block: boolean;
    is_metadata_block: boolean;
    is_difficulty_block: boolean;
    is_event_block: boolean;
    is_timing_points_block: boolean;
    is_color_block: boolean;
    is_hit_objects_block: boolean;
};

export const beatmap_block_type_defaults: beatmap_block = {
    is_general_block: false,
    is_metadata_block: false,
    is_editor_block: false,
    is_difficulty_block: false,
    is_event_block: false,
    is_timing_points_block: false,
    is_color_block: false,
    is_hit_objects_block: false
}

export function getBlockType(row: string): beatmap_block {
    let beatmap_block_type: beatmap_block = Object.assign({}, beatmap_block_type_defaults);

    if (row.startsWith('[General]')){
        beatmap_block_type.is_general_block = true;
    }

    if (row.startsWith('[Editor]')){
        beatmap_block_type.is_editor_block = true;
    }

    if (row.startsWith('[Metadata]')){
        beatmap_block_type.is_metadata_block = true;
    }

    if (row.startsWith('[Difficulty]')){
        beatmap_block_type.is_difficulty_block = true;
    }

    if (row.startsWith('[Events]')){
        beatmap_block_type.is_event_block = true;
    }

    if (row.startsWith('[TimingPoints]')){
        beatmap_block_type.is_timing_points_block = true;
    }
    
    if (row.startsWith('[Colours]')){
        beatmap_block_type.is_color_block = true;
    }

    if (row.startsWith('[HitObjects]')){
        beatmap_block_type.is_hit_objects_block = true;
    }

    return beatmap_block_type;
}
    