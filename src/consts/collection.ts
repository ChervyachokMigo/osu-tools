import { beatmap_results } from './beatmap_results';


export type collection = {
    name: string;
    beatmaps_md5: string[];
    beatmaps?: beatmap_results[];
};
