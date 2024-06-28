"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_score_grade = void 0;
const score_grade_1 = require("../consts/score_grade");
const variable_types_1 = require("../consts/variable_types");
const get_score_grade = (score) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const count_all = score.count_50 + score.count_100 + score.count_300;
    if (count_all == 0 && score.count_miss == 0) {
        return score_grade_1.score_grade.None;
    }
    const percent_300 = count_all > 0 ? score.count_300 / count_all : 1;
    const percent_50 = count_all > 0 ? score.count_50 / count_all : 1;
    switch (score.gamemode_int) {
        case variable_types_1.Gamemode.osu:
            if (score.count_50 + score.count_100 + score.count_miss == 0) {
                if ((_a = score.mods) === null || _a === void 0 ? void 0 : _a.indexOf('HD')) {
                    return score_grade_1.score_grade.SS_X;
                }
                else {
                    return score_grade_1.score_grade.SS;
                }
            }
            else if (percent_300 > 0.9 && percent_50 < 0.01 && score.count_miss == 0) {
                if ((_b = score.mods) === null || _b === void 0 ? void 0 : _b.indexOf('HD')) {
                    return score_grade_1.score_grade.S_X;
                }
                else {
                    return score_grade_1.score_grade.S;
                }
            }
            else if (percent_300 > 0.9 || (percent_300 > 0.8 && score.count_miss == 0)) {
                return score_grade_1.score_grade.A;
            }
            else if (percent_300 > 0.8 || (percent_300 > 0.7 && score.count_miss == 0)) {
                return score_grade_1.score_grade.B;
            }
            else if (percent_300 > 0.6) {
                return score_grade_1.score_grade.C;
            }
            else {
                return score_grade_1.score_grade.D;
            }
        case variable_types_1.Gamemode.taiko:
            if (score.count_50 + score.count_100 + score.count_miss == 0) {
                if ((_c = score.mods) === null || _c === void 0 ? void 0 : _c.indexOf('HD')) {
                    return score_grade_1.score_grade.SS_X;
                }
                else {
                    return score_grade_1.score_grade.SS;
                }
            }
            else if (percent_300 > 0.9 && score.count_miss == 0) {
                if ((_d = score.mods) === null || _d === void 0 ? void 0 : _d.indexOf('HD')) {
                    return score_grade_1.score_grade.S_X;
                }
                else {
                    return score_grade_1.score_grade.S;
                }
            }
            else if ((percent_300 > 0.8 && score.count_miss == 0) || percent_300 > 0.9) {
                return score_grade_1.score_grade.A;
            }
            else if ((percent_300 > 0.7 && score.count_miss == 0) || percent_300 > 0.8) {
                return score_grade_1.score_grade.B;
            }
            else if (percent_300 > 0.6) {
                return score_grade_1.score_grade.C;
            }
            else {
                return score_grade_1.score_grade.D;
            }
        case variable_types_1.Gamemode.catch:
            const accuracy_fruits = (score.count_300 + score.count_100 + score.count_50) /
                (score.count_miss + score.count_katu);
            /*console.log('debug grade');
            console.log('accuracy_fruits', accuracy_fruits,
                score.count_300, score.count_geki, score.count_katu, score.count_100, score.count_50, score.count_miss );*/
            if (accuracy_fruits == 1) {
                if ((_e = score.mods) === null || _e === void 0 ? void 0 : _e.indexOf('HD')) {
                    return score_grade_1.score_grade.SS_X;
                }
                else {
                    return score_grade_1.score_grade.SS;
                }
            }
            else if (accuracy_fruits > 0.98 && accuracy_fruits < 1) {
                if ((_f = score.mods) === null || _f === void 0 ? void 0 : _f.indexOf('HD')) {
                    return score_grade_1.score_grade.S_X;
                }
                else {
                    return score_grade_1.score_grade.S;
                }
            }
            else if (accuracy_fruits > 0.94 && accuracy_fruits <= 0.98) {
                return score_grade_1.score_grade.A;
            }
            else if (accuracy_fruits > 0.9 && accuracy_fruits <= 0.94) {
                return score_grade_1.score_grade.B;
            }
            else if (accuracy_fruits > 0.85 && accuracy_fruits <= 0.9) {
                return score_grade_1.score_grade.C;
            }
            else {
                return score_grade_1.score_grade.D;
            }
        case variable_types_1.Gamemode.mania:
            /*	Количество радужных 300 названо countGeki.
                Количество 200 названо countKatu.*/
            const count_all_mania = score.count_50 + score.count_100 + score.count_300 +
                score.count_geki + score.count_katu + score.count_miss;
            const accuracy_mania = (300 * score.count_geki + 300 * score.count_300 + 200 * score.count_katu +
                100 * score.count_100 + 50 * score.count_50) / (300 * count_all_mania);
            /*console.log('debug grade');
            console.log('accuracy_mania', accuracy_mania,
                score.count_300, score.count_geki, score.count_katu, score.count_100, score.count_50, score.count_miss );*/
            if (accuracy_mania == 1) {
                if ((_g = score.mods) === null || _g === void 0 ? void 0 : _g.indexOf('HD')) {
                    return score_grade_1.score_grade.SS_X;
                }
                else {
                    return score_grade_1.score_grade.SS;
                }
            }
            else if (accuracy_mania > 0.95 && accuracy_mania < 1) {
                if ((_h = score.mods) === null || _h === void 0 ? void 0 : _h.indexOf('HD')) {
                    return score_grade_1.score_grade.S_X;
                }
                else {
                    return score_grade_1.score_grade.S;
                }
            }
            else if (accuracy_mania > 0.9 && accuracy_mania <= 0.95) {
                return score_grade_1.score_grade.A;
            }
            else if (accuracy_mania > 0.8 && accuracy_mania <= 0.9) {
                return score_grade_1.score_grade.B;
            }
            else if (accuracy_mania > 0.7 && accuracy_mania <= 0.8) {
                return score_grade_1.score_grade.C;
            }
            else {
                return score_grade_1.score_grade.D;
            }
    }
};
exports.get_score_grade = get_score_grade;
