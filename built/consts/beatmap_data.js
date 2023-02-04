"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beatmap_data_hit_sound = exports.beatmap_data_hit_object_type = exports.beatmap_color_type = exports.beatmap_overlay_position = exports.hit_sample_set = exports.beatmap_sample_set = exports.beatmap_countdown = void 0;
/**[General]
 *
 * Speed of the countdown before the first hit object
 *
 * @param  default 1
*/
var beatmap_countdown;
(function (beatmap_countdown) {
    beatmap_countdown[beatmap_countdown["none"] = 0] = "none";
    beatmap_countdown[beatmap_countdown["normal"] = 1] = "normal";
    beatmap_countdown[beatmap_countdown["half"] = 2] = "half";
    beatmap_countdown[beatmap_countdown["double"] = 3] = "double";
})(beatmap_countdown = exports.beatmap_countdown || (exports.beatmap_countdown = {}));
/**[General]
 *
 * Sample set that will be used if timing points do not override it
 *
 * @param  default Normal
*/
var beatmap_sample_set;
(function (beatmap_sample_set) {
    beatmap_sample_set[beatmap_sample_set["Normal"] = 0] = "Normal";
    beatmap_sample_set[beatmap_sample_set["Soft"] = 1] = "Soft";
    beatmap_sample_set[beatmap_sample_set["Drum"] = 2] = "Drum";
})(beatmap_sample_set = exports.beatmap_sample_set || (exports.beatmap_sample_set = {}));
/** [Timing points] and [Hit objects]
 *
 * Default sample set for hit objects
 */
var hit_sample_set;
(function (hit_sample_set) {
    /**
     *
     * [Hit objects]
     *
     * No custom sample set
     *
     * For normal sounds, the set is determined by the timing point's sample set.
     *
     * For additions, the set is determined by the normal sound's sample set.
     */
    hit_sample_set[hit_sample_set["Default"] = 0] = "Default";
    /**
     * Normal set
     */
    hit_sample_set[hit_sample_set["Normal"] = 1] = "Normal";
    /**
     * Soft set
     */
    hit_sample_set[hit_sample_set["Soft"] = 2] = "Soft";
    /**
     * Drum set
     */
    hit_sample_set[hit_sample_set["Drum"] = 3] = "Drum";
})(hit_sample_set = exports.hit_sample_set || (exports.hit_sample_set = {}));
/**[General]
 *
 * Draw order of hit circle overlays compared to hit numbers
 *
 * @param  default NoChange
 */
var beatmap_overlay_position;
(function (beatmap_overlay_position) {
    /** [General]
     *
     * use skin setting
     */
    beatmap_overlay_position[beatmap_overlay_position["NoChange"] = 0] = "NoChange";
    /** [General]
     *
     * draw overlays under numbers
     */
    beatmap_overlay_position[beatmap_overlay_position["Below"] = 1] = "Below";
    /** [General]
     *
     * draw overlays on top of numbers
     */
    beatmap_overlay_position[beatmap_overlay_position["Above"] = 2] = "Above";
})(beatmap_overlay_position = exports.beatmap_overlay_position || (exports.beatmap_overlay_position = {}));
/**
 * [Colors]
 *
 * All options in this section represent colours.
 *
 * They are comma-separated triplets of integers 0–255, representing the red, green, and blue components of the colours.
 */
var beatmap_color_type;
(function (beatmap_color_type) {
    /** [Colors]
     *
     * Additive combo colours
     */
    beatmap_color_type["Color1"] = "Color1";
    beatmap_color_type["Color2"] = "Color2";
    beatmap_color_type["Color3"] = "Color3";
    beatmap_color_type["Color4"] = "Color4";
    beatmap_color_type["Color5"] = "Color5";
    beatmap_color_type["Color6"] = "Color6";
    beatmap_color_type["Color7"] = "Color7";
    beatmap_color_type["Color8"] = "Color8";
    /** [Colors]
     *
     * Additive slider track colour
     */
    beatmap_color_type["SliderTrackOverride"] = "SliderTrackOverride";
    /** [Colors]
     *
     * Slider border colour
     */
    beatmap_color_type["SliderBorder"] = "SliderBorder";
})(beatmap_color_type = exports.beatmap_color_type || (exports.beatmap_color_type = {}));
/** [Hit objects]
 *
 * Type of the object.*/
var beatmap_data_hit_object_type;
(function (beatmap_data_hit_object_type) {
    beatmap_data_hit_object_type[beatmap_data_hit_object_type["hitcircle"] = 0] = "hitcircle";
    beatmap_data_hit_object_type[beatmap_data_hit_object_type["slider"] = 1] = "slider";
    beatmap_data_hit_object_type[beatmap_data_hit_object_type["spinner"] = 2] = "spinner";
    beatmap_data_hit_object_type[beatmap_data_hit_object_type["mania_hold"] = 3] = "mania_hold";
})(beatmap_data_hit_object_type = exports.beatmap_data_hit_object_type || (exports.beatmap_data_hit_object_type = {}));
/** [Hit objects]
 *
 * Hitsound applied to the object.
 */
var beatmap_data_hit_sound;
(function (beatmap_data_hit_sound) {
    beatmap_data_hit_sound[beatmap_data_hit_sound["Normal"] = 0] = "Normal";
    beatmap_data_hit_sound[beatmap_data_hit_sound["Whistle"] = 1] = "Whistle";
    beatmap_data_hit_sound[beatmap_data_hit_sound["Finish"] = 2] = "Finish";
    beatmap_data_hit_sound[beatmap_data_hit_sound["Clap"] = 3] = "Clap";
})(beatmap_data_hit_sound = exports.beatmap_data_hit_sound || (exports.beatmap_data_hit_sound = {}));
