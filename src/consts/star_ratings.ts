import { StarRating } from "./variable_types";

export type star_ratings = {
	star_rating_std?: StarRating[],
	star_rating_taiko?: StarRating[],
	star_rating_ctb?: StarRating[],
	star_rating_mania?: StarRating[]
}

export type beatmap_star_ratings = {
	beatmap_md5: string,
	star_ratings: star_ratings
}

export type sr_raw_result = {
	version: number,
	beatmaps: beatmap_star_ratings[]
};
