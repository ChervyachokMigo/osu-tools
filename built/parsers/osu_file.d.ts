import { osu_file_type } from '../consts/osu_file_type';
import { raw_file } from './raw_file';
export declare class osu_file extends raw_file {
    file_type: osu_file_type;
    property_settings: Array<any>;
    constructor(file_path: string, property_settings?: any[]);
    get_type(): osu_file_type;
    set_type(): boolean;
    set_property_settings(property_settings: Array<any>): void;
}
//# sourceMappingURL=osu_file.d.ts.map