import { Gamemode } from "./variable_types";

export enum beatmap_countdown {
    none = 0,
    normal = 1,
    half = 2,
    double = 3
}

export enum beatmap_sample_set {
    Normal = 'Normal',
    Soft = 'Soft',
    Drum = 'Drum'
}

export enum beatmap_overlay_position {
    NoChange = 'NoChange',
    Below = 'Below',
    Above = 'Above'
}

export type beatmap_data = {
    general: beatmap_data_general,

    metadata: beatmap_metadata,
}

/**
 * [General]
 * 
 * General information about the beatmap
 */
export type beatmap_data_general = {
        /**[General]

        Location of the audio file relative to the current folder
        */
    audio_filename?: string;

        /**[General]
        
        Milliseconds of silence before the audio starts playing
        @param default 0 
        */
    audio_leadin?: number;

        /**[General]
        
        @deprecated
        */
    audio_hash?: string;

        /**[General]
        
        Time in milliseconds when the audio preview should start
        @param default -1
        */
    preview_time?: number;

        /**[General]
        
        Speed of the countdown before the first hit object (0 = no countdown, 1 = normal, 2 = half, 3 = double)
        @param  default 1 
        */
    countdown?: beatmap_countdown;

        /**[General]
        
        Sample set that will be used if timing points do not override it (Normal, Soft, Drum)
        @param  default Normal  
        */
    sample_set?: beatmap_sample_set;

        /**[General]
        
        Multiplier for the threshold in time where hit objects placed close together stack (0–1)
        @param  default 0.7
        */
    stack_leniency?: number;

        /**[General]
        
        Game mode (0 = osu, 1 = taiko, 2 = catch, 3 = mania)
        @param  default 0 
        */
    gamemode?: Gamemode;

        /**[General]
        
        Whether or not breaks have a letterboxing effect
        @param  default 0 
        */
    is_letterbox_in_break?: boolean;

        /**[General]
        
        @deprecated
        @param  default 1
        */
    is_storyfire_in_front?: boolean;

        /**[General]
        
        Whether or not the storyboard can use the user's skin images
        @param  default 0 
        */
    is_use_skin_sprites?: boolean;

        /**[General]
        
        @deprecated
        @param  default 0 
        */
    is_always_show_playfield?: boolean;

        /**[General]
        
        Draw order of hit circle overlays compared to hit numbers 
        (NoChange = use skin setting, Below = draw overlays under numbers, Above = draw overlays on top of numbers)
        @param  default NoChange 
        */
    overlay_position?: beatmap_overlay_position

        /**[General]
        
        Preferred skin to use during gameplay
        */
    skin_preference?: string;

        /**[General]
        
        Whether or not a warning about flashing colours should be shown at the beginning of the map
        @param  default 0 
        */
    is_epilepsy_warning?: boolean;

        /**[General]
        
        Time in beats that the countdown starts before the first hit object
        @param  default 0 
        */
    countdown_offset?: number;

        /**[General]
        
        Whether or not the "N+1" style key layout is used for osu!mania
        @param  default 0 
        */
    is_special_style?: boolean;

        /**[General]
        
    	Whether or not the storyboard allows widescreen viewing
        @param  default 0 
        */
    is_widescreen_storyboard?: boolean;

        /**[General]
        
        Whether or not sound samples will change rate when playing with speed-changing mods
        @param  default 0 
        */
    is_samples_match_playback_rate?: boolean;

}

/**
 * [Metadata]
 * 
 * Information used to identify the beatmap
 */
export type beatmap_metadata = {
        /**[Metadata]

        Beatmap MD5 hash string */
    beatmap_md5?: string;

        /**[Metadata]

        Romanised song title */
    title?: string;

        /**[Metadata]

        Song title */
    title_unicode?: string;

        /**[Metadata]

        Romanised song artist */
    artist?: string;

        /**[Metadata]
        
        Song artist */
    artist_unicode?: string;

        /**[Metadata]

        Beatmap creator */
    creator?: string;

        /**[Metadata]

        Difficulty name */
    version?: string;

        /**[Metadata]

        Original media the song was produced for */
    sourse?: string;

        /**[Metadata]

        Search terms */
    tags?: string[];

        /**[Metadata]

        Difficulty ID */
    beatmap_id?: number;

        /**[Metadata]

        Beatmap ID */
    beatmapset_id?: number;

}