export type IntDoublePair = {
    int: number,
    double: number
}

export type StarRating = {
    //mods?: string[],
    mods_int?: number,
    stars?: number
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
    osu = 0, 
    taiko = 1, 
    catch = 2, 
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

export type HP_Bar = {
    offset: number,
    hp: number
}

export type ReplayFrame = {
    offset: bigint,
    time: bigint,
    x: number,
    y: number,
    keys_pressed: KeysPressed
}

export type ReplayData = {
    replay_seed: number,
    replay_frames: ReplayFrame[],
    replay_frames_raw: string[][]
}
export type KeysPressed = {
    Key_1: boolean,
    Key_2: boolean,
    Key_3: boolean,
    Key_4: boolean,
    Key_Smoke: boolean
}

export type WindowsTickRate = {
	int: bigint,
	date: Date
}

