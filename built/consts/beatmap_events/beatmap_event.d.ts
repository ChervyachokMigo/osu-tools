import { beatmap_event_type } from "./beatmap_event_type";
import { beatmap_event_layer } from "./beatmap_event_layer";
import { beatmap_event_origin } from "./beatmap_event_origin";
import { color } from "../color";
import { beatmap_event_loop_type } from "./beatmap_event_loop_type";
export declare type beatmap_event = {
    type: beatmap_event_type;
    layer?: beatmap_event_layer;
    origin?: beatmap_event_origin;
    data_string?: string;
    file_name?: string;
    time_offset?: number;
    time_offset_end?: number;
    color?: color;
    x_offset?: number;
    y_offset?: number;
    frame_count?: number;
    frame_delay?: number;
    loop_type?: beatmap_event_loop_type;
};
//# sourceMappingURL=beatmap_event.d.ts.map