export type IntDoublePair = {
    int: number,
    double: number
}

export type StarRating = {
    mods: string[],
    mods_int: number,
    stars: number
}

export type TimingPoint = {
    bpm: number,
    offset: number,
    is_inherit: boolean
}

export enum UserPermissions {
    None = 0, 
    Normal = 1, 
    Moderator = 2,
    Supporter = 4, 
    Friend = 8, 
    peppy = 16, 
    World_Cup_staff = 32
}

export enum Gamemode {
    std = 0, 
    taiko = 1, 
    ctb = 2, 
    mania = 3
}

export enum RankedStatus {
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