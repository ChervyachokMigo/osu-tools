import { Gamemode } from "./variable_types";

/**
 * data of .osu (file format)
 * 
 * .osu is a human-readable file format containing information about a beatmap.
 */
 export type beatmap_data = {
    /**
     * [General]
     * 
     * General information about the beatmap
     */
    general?: beatmap_data_general;
    /**
     * [Editor]
     * 
     * These options are only relevant when opening maps in the beatmap editor. They do not affect gameplay.
     */
    editor?: beatmap_data_editor;
    /**
     * [Metadata]
     * 
     * Information used to identify the beatmap
     */
    metadata?: beatmap_metadata;
    /**
     * [Difficulty]	
     * 
     * Difficulty settings
     */
    difficulty?: beatmap_data_difficulty;

    /**
     * [Events]	
     * 
     * Beatmap and storyboard graphic events
     */
    /**
     * 
     * 
     * Event syntax: eventType,startTime,eventParams
     * 
     * Background syntax: 0,0,filename,xOffset,yOffset
     * 
     * Video syntax: Video,startTime,filename,xOffset,yOffset
     * 
     * Video may be replaced by 1.
     * 
     * Break syntax: 2,startTime,endTime
     * 
     * 2 may be replaced by Break.
     * 
     * Storyboards
     * 
     * For information about storyboard syntax, see Storyboard Scripting.
     * https://osu.ppy.sh/wiki/en/Storyboard/Scripting
     */
    events?: string[];

    /**
    * [Timing points]
    * 
    * Timing and control points
    * 
    * Each timing point influences a specified portion of the map, commonly called a "timing section". 
    * 
    * The .osu file format requires these to be sorted in chronological order.
    */
    timing_points: beatmap_timing_point[];

    colors: beatmap_data_color[];

}


/**[General]
 *
 * Speed of the countdown before the first hit object
 * 
 * @param  default 1 
*/
export enum beatmap_countdown {
    none = 0,
    normal = 1,
    half = 2,
    double = 3
}

/**[General]
 * 
 * Sample set that will be used if timing points do not override it
 * 
 * @param  default Normal 
*/
export enum beatmap_sample_set {
    Normal = 'Normal',
    Soft = 'Soft',
    Drum = 'Drum'
}

/** [Timing points]
 * 
 * Default sample set for hit objects
 */
export enum timing_point_sample_set {
    Default = 0,
    Normal = 1,
    Soft = 2,
    Drum = 3
}

/**[General]
 * 
 * Draw order of hit circle overlays compared to hit numbers 
 * 
 * @param  default NoChange 
 */
export enum beatmap_overlay_position {
    /** [General]
     * 
     * use skin setting
     */
    NoChange = 'NoChange',

    /** [General]
     * 
     * draw overlays under numbers
     */
    Below = 'Below',
    /** [General]
     * 
     * draw overlays on top of numbers
     */
    Above = 'Above'
}

/** [Timing points]
 * 
 * Timing points have two extra effects that can be toggled
 */
 export type timing_point_effect = {
    /** [Timing points]
     * 
     * Whether or not kiai time is enabled
     */
    is_kiai: boolean;
    /** [Timing points]
     * 
     * Whether or not the first barline is omitted in osu!taiko and osu!mania
     */
    is_first_barline: boolean;
}

/**
 * [Colors]
 * 
 * All options in this section represent colours. 
 * 
 * They are comma-separated triplets of integers 0–255, representing the red, green, and blue components of the colours.
 */
export type beatmap_color_type = {
    /** [Colors]
     * 
     * Additive combo colours
     */
    Color1: 'Color1',
    Color2: 'Color2',
    Color3: 'Color3',
    Color4: 'Color4',
    Color5: 'Color5',
    Color6: 'Color6',
    Color7: 'Color7',
    Color8: 'Color8',

    /** [Colors]
     * 
     * Additive slider track colour
     */
    SliderTrackOverride: 'SliderTrackOverride',

    /** [Colors]
     * 
     * Slider border colour
     */
    SliderBorder: 'SliderBorder'
}


const NOTECOLOR = {
    DON: 1,
    KATSU: 2
}
/** [Hit objects]
 *
 * Type of the object.*/
export enum beatmap_data_hit_object_type {
    hitcircle = 1,
    slider = 2,
    spinner = 3
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
 * [Editor]
 * 
 * These options are only relevant when opening maps in the beatmap editor. They do not affect gameplay.
 */
export type beatmap_data_editor = {
        /**[Editor]

        Comma-separated list of integers
        Time in milliseconds of bookmarks */
    bookmarks?: number[];

        /**[Editor]

        Distance snap multiplier */
    distance_snapping?: number;

        /**[Editor]

        Beat snap divisor */
    beat_divisor?: number;

        /**[Editor]

        Grid size */
    grid_size?: number;

        /**[Editor]

        Scale factor for the object timeline */
    timeline_zoom?: number;

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

/**
 * [Difficulty]	
 * 
 * Difficulty settings
 */
export type beatmap_data_difficulty = {

    /**
     * [Difficulty]	
     * 
     * HP setting (0–10)
     */
    Health_Points_drain_rate?: number;

    /**
     * [Difficulty]	
     * 
     * CS setting (0–10)
     */
    Circle_Size?: number;

    /**
     * [Difficulty]	
     * 
     * OD setting (0–10)
     */
    Overall_Difficulty?: number;

    /**
     * [Difficulty]	
     * 
     * AR setting (0–10)
     */
    Approach_Rate?: number;

    /**
     * [Difficulty]	
     * 
     * Base slider velocity in hundreds of osu! pixels per beat
     */
    slider_multiplier?: number;

    /**
     * [Difficulty]	
     * 
     * Amount of slider ticks per beat
     */
    slider_tick_rate?: number;

}

/**
 * [Timing points]
 * 
 * Timing and control points
 * 
 * Each timing point influences a specified portion of the map, commonly called a "timing section". 
 * 
 * The .osu file format requires these to be sorted in chronological order.
 */
export type beatmap_timing_point = {
    /** [Timing points]
     * 
     * Start time of the timing section, in milliseconds from the beginning of the beatmap's audio. 
     * 
     * The end of the timing section is the next timing point's time (or never, if this is the last timing point).
     */
    time_offset: number;
    /** [Timing points]
     * 
     * This property has two meanings:
     * 
     * * For uninherited timing points, the duration of a beat, in milliseconds.
     * 
     * * For inherited timing points, a negative inverse slider velocity multiplier, as a percentage. 
     * 
     *   For example, -50 would make all sliders in this timing section twice as fast as SliderMultiplier.
     */
    beat_length: number;
    /** [Timing points]
     * 
     * Amount of beats in a measure. Inherited timing points ignore this property.
     */
    meter: number;
    /** [Timing points]
     * 
     * Default sample set for hit objects (0 = beatmap default, 1 = normal, 2 = soft, 3 = drum).
     */
    sample_set: timing_point_sample_set;
    /** [Timing points]
     * 
     * Custom sample index for hit objects. 0 indicates osu!'s default hitsounds.
     */
    sample_index: number;
    /** [Timing points]
     * 
     * Volume percentage for hit objects.
     */
    volume: number;
    /** [Timing points]
     * 
     * Whether or not the timing point is uninherited.
     */
    uninherited: boolean;
    /** [Timing points]
     * 
     * Timing points have two extra effects that can be toggled
     */
    effects: timing_point_effect;
}

/**
 * [Colors]
 * 
 * All options in this section represent colours. 
 * 
 * They are comma-separated triplets of integers 0–255, representing the red, green, and blue components of the colours.
 */
export type beatmap_data_color = {
    /** [Colors]
     * 
     * Type of color
     */
    type?: beatmap_color_type;
    /** [Colors]
     * 
     * Red component of color
     */
    red?: number;
    /** [Colors]
     * 
     * Green component of color
     */
    green?: number;
    /** [Colors]
     * 
     * Blue component of color
     */
    blue?: number;
}

/**
 * [Hit objects]
 * 
 * Hit object syntax: x,y,time,type,hitSound,objectParams,hitSample
 */
export type beatmap_data_hit_object = {
    /** [Hit objects]
     * 
     *  Position x in osu! pixels of the object.
     */
    x:  number;

    /** [Hit objects]
     * 
     *  Position y in osu! pixels of the object.
     */
    y:  number;

    /** [Hit objects]
     *
     * Time when the object is to be hit, in milliseconds from the beginning of the beatmap's audio.
     */
    time: number;

    /** [Hit objects]
     *
     * Type of the object.*/
    type: beatmap_data_hit_object_type;

    /** [Hit objects]
     *
     * Hitsound applied to the object. 
     */
    hitSound?: beatmap_data_hit_sound;

    /** [Hit objects]
     *
     * Extra parameters specific to the object's type.
     */
    objectParams?: beatmap_data_hit_object_params;

    /** [Hit objects]
     *
     *  Information about which samples are played when the object is hit. 
     * 
     * It is closely related to hitSound.
     * 
     * If it is not written, it defaults to 0:0:0:0:
     */
    hitSample?: beatmap_data_hit_sample;

}