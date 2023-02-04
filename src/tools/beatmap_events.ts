import { beatmap_event } from "../consts/beatmap_events/beatmap_event";

import { beatmap_event_type } from "../consts/beatmap_events/beatmap_event_type";
import { beatmap_event_layer } from "../consts/beatmap_events/beatmap_event_layer";
import { beatmap_event_origin } from "../consts/beatmap_events/beatmap_event_origin";
import { color } from "../consts/color";
import { beatmap_event_loop_type } from "../consts/beatmap_events/beatmap_event_loop_type";

import { osu_file_beatmap_property } from "../consts/property_settings";

export function event_string_parse(row_escaped: string, osu_file_beatmap_properties: osu_file_beatmap_property[]): beatmap_event {
    const properties_has_events_block = osu_file_beatmap_properties.includes(osu_file_beatmap_property.events_block);

    //Background event
    if (properties_has_events_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_backgrounds) !== -1) {

        if ( row_escaped.startsWith('0') ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.background,
                time_offset: Number(row_splitted[1]),
                file_name: row_splitted[2].replace(/\"/g, ''),
                x_offset: isNaN(Number(row_splitted[3])) === false ? Number(row_splitted[3]) : 0,
                y_offset: isNaN(Number(row_splitted[4])) === false ? Number(row_splitted[4]) : 0,
            } as beatmap_event;

        }
    }

    //Video event
    if (properties_has_events_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_videos) !== -1) {

        if( row_escaped.startsWith('1') || row_escaped.startsWith('Video') ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.video,
                time_offset: Number(row_splitted[1]),
                file_name: row_splitted[2].replace(/\"/g, '')
            } as beatmap_event;

        }
    }

    //Break event
    if (properties_has_events_block ||
        osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_break_points) !== -1) {
            
        if( row_escaped.startsWith('2') ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.beatmap_break,
                time_offset: Number(row_splitted[1]),
                time_offset_end: Number(row_splitted[2])
            } as beatmap_event;

        }
    }

    //Color Transformations event (old)
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_color_transformations) !== -1) {
        
        if( row_escaped.startsWith('3') ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.color,
                time_offset: Number(row_splitted[1]),
                color: {
                    r: Number(row_splitted[2]), 
                    g: Number(row_splitted[3]),
                    b: Number(row_splitted[4])
                } as color
            } as beatmap_event;

        }
    }

    //Sprite event
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_sprites) !== -1) {

        if( row_escaped.startsWith('4') || row_escaped.startsWith('Sprite')  ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.sprite,

                layer: isNaN(Number(row_splitted[1])) ?
                    beatmap_event_layer[row_splitted[1] as keyof beatmap_event_layer as any] :
                    Number(row_splitted[1]) as beatmap_event_layer,

                origin: isNaN(Number(row_splitted[2])) ?
                    beatmap_event_origin[row_splitted[2] as keyof beatmap_event_origin as any] :
                    Number(row_splitted[2]) as beatmap_event_origin,

                file_name: row_splitted[3].replace(/\"/g, ''),
                x_offset:  Number(row_splitted[4]),
                y_offset: Number(row_splitted[5]) 
            } as beatmap_event;

        }
    }

    //Sample event
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_samples) !== -1) {

        if( row_escaped.startsWith('5') || row_escaped.startsWith('Sample')  ){

            let row_splitted = row_escaped.split(',');

            return { 
                type: beatmap_event_type.sample,
                time_offset: Number(row_splitted[1]),

                layer: isNaN(Number(row_splitted[2])) ?
                    beatmap_event_layer[row_splitted[2] as keyof beatmap_event_layer as any] :
                    Number(row_splitted[2]) as beatmap_event_layer,
                
                file_name: row_splitted[3].replace(/\"/g, '')
            } as beatmap_event;

        }
    }

    //Animation event
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_animations) !== -1) {
        
        if( row_escaped.startsWith('6') || row_escaped.startsWith('Animation')  ){

            let row_splitted = row_escaped.split(',');

            //default loop type
            let loop_type = beatmap_event_loop_type.loop_once;

            if ( row_splitted.length > 7 && typeof row_splitted[7] !== 'undefined'){
                switch (row_splitted[7]) { 
                    case 'LoopOnce':
                        loop_type = beatmap_event_loop_type.loop_once
                    break;
                    case 'LoopForever':
                        loop_type = beatmap_event_loop_type.loop_forever
                    break;
                }
            }

            return { 
                type: beatmap_event_type.animation,

                layer: isNaN(Number(row_splitted[1])) ?
                    beatmap_event_layer[row_splitted[1] as keyof beatmap_event_layer as any] :
                    Number(row_splitted[1]) as beatmap_event_layer,

                origin: isNaN(Number(row_splitted[2])) ?
                    beatmap_event_origin[row_splitted[2] as keyof beatmap_event_origin as any] :
                    Number(row_splitted[2]) as beatmap_event_origin,

                file_name: row_splitted[3].replace(/\"/g, ''),
                x_offset:  Number(row_splitted[4]),
                y_offset: Number(row_splitted[5]),
                frame_count: Number(row_splitted[6]),
                frame_delay: Number(row_splitted[7]),
                loop_type: loop_type as beatmap_event_loop_type
            } as beatmap_event;
            
        }
    }

    //Comment event
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_comments) !== -1) {

        if( row_escaped.startsWith('//') ){

            return { 
                type: beatmap_event_type.comment, 
                data_string: row_escaped 
            } as beatmap_event;

        }
    }

    //Script event
    if (properties_has_events_block ||
    osu_file_beatmap_properties.indexOf(osu_file_beatmap_property.events_scripts) !== -1) {

        if( row_escaped.startsWith(' ') || row_escaped.startsWith('  ')||
        row_escaped.startsWith('_') || row_escaped.startsWith('__') ){

            return { 
                type: beatmap_event_type.script_row, 
                data_string: row_escaped 
            } as beatmap_event;

        }
    }

    //unknown_event return if string not found
    return { 
        type: beatmap_event_type.unknown,
        data_string: row_escaped 
    }; 

    
}
