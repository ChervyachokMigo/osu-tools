import { realm_beatmap } from "./realm_beatmap";
import { realm_file } from "./realm_file";
export type realm_beatmapset = {
    ID: any;
    OnlineID: number;
    DateAdded: Date | null;
    DateSubmitted: Date | null;
    DateRanked: Date | null;
    Beatmaps: Array<realm_beatmap>;
    Files: Array<realm_file>;
    Status: number;
    DeletePending: boolean;
    Hash: string;
    Protected: boolean;
};
//# sourceMappingURL=ream_beatmapset.d.ts.map