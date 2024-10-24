import { score_grade } from './score_grade';
import { TimingPoint, RankedStatus, Gamemode, StarRating, WindowsTickRate, BPM } from './variable_types';

export type beatmap_results = {
    beatmap_size?: number;
    artist?: string;
    artist_unicode?: string;
    title?: string;
    title_unicode?: string;
    creator?: string;
    difficulty?: string;
    audio_filename?: string;
    beatmap_md5?: string;
    osu_filename?: string;
    ranked_status_int?: RankedStatus;
    ranked_status?: string;
    number_hitcircles?: number;
    number_sliders?: number;
    number_spinners?: number;
    mod_date?: WindowsTickRate;
    AR?: number;
    CS?: number;
    HP?: number;
    OD?: number;
    slider_velocity?: number;
    star_rating_mania?: StarRating[];
    star_rating_ctb?: StarRating[];
    star_rating_taiko?: StarRating[];
    star_rating_std?: StarRating[];
    drain_time?: number;
    total_time?: number;
    preview_time?: number;
    timing_points?: TimingPoint[];
	BPM?: BPM[];
    beatmap_id?: number;
    beatmapset_id?: number;
    thread_id?: number;
    grade_achieved_std?: score_grade;
    grade_achieved_taiko?: score_grade;
    grade_achieved_ctb?: score_grade;
    grade_achieved_mania?: score_grade;
    local_offset?: number;
    stack_laniecy?: number;
    gamemode_int?: Gamemode;
    gamemode?: string;
    source?: string;
    tags?: string;
    online_offset?: number;
    font_title?: string;
    is_unplayed?: boolean;
    last_played?: WindowsTickRate;
    is_OSZ2?: boolean;
    folder_name?: string;
    last_checked_repository_time?: WindowsTickRate;
    is_ignore_hit_sounds?: boolean;
    is_ignore_skin?: boolean;
    is_disable_storyboard?: boolean;
    is_disable_video?: boolean;
    is_visual_override?: boolean;
    unknown_value?: number,
    mod_time?: number;
    mania_scroll?: number;
};
