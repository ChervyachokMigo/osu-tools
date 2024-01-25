export declare type IntDoublePair = {
    int: number;
    double: number;
};
export declare type StarRating = {
    mods_int?: number;
    stars?: number;
};
export declare type TimingPoint = {
    bpm: number;
    offset: number;
    is_inherit: boolean;
};
export declare enum UserPermissions {
    None = 0,
    Normal = 1,
    Moderator = 2,
    Supporter = 4,
    Friend = 8,
    peppy = 16,
    World_Cup_staff = 32
}
export declare enum Gamemode {
    osu = 0,
    taiko = 1,
    catch = 2,
    mania = 3
}
export declare enum RankedStatus {
    unknown = 0,
    unsubmitted = 1,
    pending = 2,
    wip = 2,
    graveyard = 2,
    unused = 3,
    ranked = 4,
    approved = 5,
    qualified = 6,
    loved = 7
}
export declare type HP_Bar = {
    offset: number;
    hp: number;
};
export declare type ReplayFrame = {
    offset: bigint;
    time: bigint;
    x: number;
    y: number;
    keys_pressed: KeysPressed;
};
export declare type ReplayData = {
    replay_seed: number;
    replay_frames: ReplayFrame[];
    replay_frames_raw: string[][];
};
export declare type KeysPressed = {
    Key_1: boolean;
    Key_2: boolean;
    Key_3: boolean;
    Key_4: boolean;
    Key_Smoke: boolean;
};
//# sourceMappingURL=variable_types.d.ts.map