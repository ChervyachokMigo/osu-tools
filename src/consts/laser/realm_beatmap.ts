import { realm_user } from "./realm_user"
import { realm_beatmapset } from "./ream_beatmapset"

export type realm_beatmap = {
	ID: any,
	DifficultyName: string,
	Ruleset: realm_beatmap_ruleset,
	Difficulty: realm_beatmap_difficulty,
	Metadata: realm_beatmap_metadata,
	UserSettings: realm_beatmap_user_settings,
	BeatmapSet: realm_beatmapset,
	Status: number,
	OnlineID: number,
	Length: number,
	BPM: number,
	Hash: string,
	StarRating: number,
	MD5Hash: string,
	OnlineMD5Hash: string,
	LastLocalUpdate: Date | null,
	LastOnlineUpdate: Date | null,
	Hidden: boolean,
	EndTimeObjectCount: number,
	TotalObjectCount: number,
	LastPlayed: Date | null,
	BeatDivisor: number,
	EditorTimestamp: Date | null
}


export type realm_beatmap_ruleset = {
	ShortName: string,
	OnlineID: number,
	Name: string,
	InstantiationInfo: string,
	LastAppliedDifficultyVersion: number,
	Available: boolean
}

export type realm_beatmap_difficulty = {
	DrainRate: number,
	CircleSize: number,
	OverallDifficulty: number,
	ApproachRate: number,
	SliderMultiplier: number,
	SliderTickRate: number
}

export type realm_beatmap_metadata = {
	Title: string,
	TitleUnicode: string,
	Artist: string,
	ArtistUnicode: string,
	Author: realm_user,
	Source: string,
	Tags: string,
	PreviewTime: number,
	AudioFile: string,
	BackgroundFile: string
}

export type realm_beatmap_user_settings = {
	Offset: number
}
