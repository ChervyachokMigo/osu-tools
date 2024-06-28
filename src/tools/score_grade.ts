
import { score } from "../consts/score";
import { score_grade } from "../consts/score_grade";
import { Gamemode } from "../consts/variable_types";

export const get_score_grade = (score: score) => {
	const count_all = (score.count_50 as number) + (score.count_100 as number) + (score.count_300 as number);

	if (count_all == 0 && score.count_miss == 0) {
		return score_grade.None;
	}

	const percent_300 = count_all > 0 ? (score.count_300 as number) / count_all : 1;
	const percent_50 = count_all > 0 ? (score.count_50 as number) / count_all : 1;

	switch (score.gamemode_int) {
		case Gamemode.osu:
			if ( (score.count_50 as number) + (score.count_100 as number) + (score.count_miss as number)  == 0) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.SS_X;
				} else {
					return score_grade.SS;
				}
			} else if (percent_300 > 0.9 && percent_50 < 0.01 && score.count_miss == 0 ) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.S_X;
				} else {
					return score_grade.S;
				}
			} else if (percent_300 > 0.9 || (percent_300 > 0.8  && score.count_miss == 0) ) {
				return score_grade.A;
			} else if (percent_300 > 0.8 || (percent_300 > 0.7  && score.count_miss == 0) ) {
				return score_grade.B;
			} else if (percent_300 > 0.6) {
				return score_grade.C;
			} else {
				return score_grade.D;
			}

        case Gamemode.taiko:
			if ( (score.count_50 as number) + (score.count_100 as number) + (score.count_miss as number)  == 0) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.SS_X;
				} else {
					return score_grade.SS;
				}
			} else if (percent_300 > 0.9 && score.count_miss == 0 ) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.S_X;
				} else {
					return score_grade.S;
				}
			} else if ( (percent_300 > 0.8  && score.count_miss == 0) || percent_300 > 0.9 ) {
				return score_grade.A;
			} else if ( (percent_300 > 0.7  && score.count_miss == 0) || percent_300 > 0.8 ) {
				return score_grade.B;
			} else if (percent_300 > 0.6) {
				return score_grade.C;
			} else {
				return score_grade.D;
			}
			
		case Gamemode.catch:
			const accuracy_fruits = ( (score.count_300 as number) + (score.count_100 as number) + (score.count_50 as number)) /
				((score.count_miss as number) + (score.count_katu as number));

			/*console.log('debug grade');
			console.log('accuracy_fruits', accuracy_fruits, 
				score.count_300, score.count_geki, score.count_katu, score.count_100, score.count_50, score.count_miss );*/

			if ( accuracy_fruits == 1) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.SS_X;
				} else {
					return score_grade.SS;
				}
			} else if ( accuracy_fruits > 0.98 && accuracy_fruits < 1) {
				if ( score.mods?.indexOf('HD') ) {
					return score_grade.S_X;
				} else {
					return score_grade.S;
				}
			} else if ( accuracy_fruits > 0.94 && accuracy_fruits <= 0.98) {
				return score_grade.A;
			} else if ( accuracy_fruits > 0.9 && accuracy_fruits <= 0.94) {
				return score_grade.B;
			} else if ( accuracy_fruits > 0.85 && accuracy_fruits <= 0.9) {
				return score_grade.C;
			} else {
				return score_grade.D;
			}

		case Gamemode.mania:
			/*	Количество радужных 300 названо countGeki.
				Количество 200 названо countKatu.*/
				const count_all_mania = (score.count_50 as number) + (score.count_100 as number) + (score.count_300 as number) +
					(score.count_geki as number) + (score.count_katu as number) + (score.count_miss as number);

				const accuracy_mania = (300 * (score.count_geki as number) + 300 * (score.count_300 as number) + 200 * (score.count_katu as number) +
					100 * (score.count_100 as number) + 50 * (score.count_50 as number)) / (300 * count_all_mania);

				/*console.log('debug grade');
				console.log('accuracy_mania', accuracy_mania, 
					score.count_300, score.count_geki, score.count_katu, score.count_100, score.count_50, score.count_miss );*/

				if ( accuracy_mania == 1) {
					if ( score.mods?.indexOf('HD') ) {
						return score_grade.SS_X;
					} else {
						return score_grade.SS;
					}
				} else if ( accuracy_mania > 0.95 && accuracy_mania < 1 ) {
					if ( score.mods?.indexOf('HD') ) {
						return score_grade.S_X;
					} else {
						return score_grade.S;
					}
				} else if ( accuracy_mania > 0.9 && accuracy_mania <= 0.95 ) {
					return score_grade.A;
				} else if ( accuracy_mania > 0.8 && accuracy_mania <= 0.9 ) {
					return score_grade.B;
				} else if ( accuracy_mania > 0.7 && accuracy_mania <= 0.8 ) {
					return score_grade.C;
				} else {
					return score_grade.D;
				}

	}
}