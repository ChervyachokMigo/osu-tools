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
export declare const beatmap_block_type_defaults: beatmap_block;
export declare function getBlockType(row: string): beatmap_block;
//# sourceMappingURL=beatmap_block.d.ts.map