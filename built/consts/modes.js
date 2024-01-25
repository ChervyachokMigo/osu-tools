"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModsIntToText = exports.mod_names = void 0;
const bitwise = __importStar(require("bitwise"));
exports.mod_names = ['NoFail', 'Easy',
    'TouchDevice', 'Hidden', 'HardRock',
    'SuddenDeath', 'DoubleTime', 'Relax',
    'HalfTime', 'Nightcore', 'Flashlight',
    'Autoplay', 'SpunOut', 'Relax2',
    'Perfect', 'Key4', 'Key5',
    'Key6', 'Key7', 'Key8',
    'FadeIn', 'Random', 'Cinema',
    'Target', 'Key9', 'KeyCoop',
    'Key1', 'Key3', 'Key2',
    'ScoreV2', 'Mirror'];
function ModsIntToText(modsBits) {
    if (modsBits == 0) {
        return ['No Mods'];
    }
    let result_mods = [];
    for (let i = 0; i < 32; i++) {
        let bit = bitwise.integer.getBit(modsBits, i);
        if (bit) {
            result_mods.push(exports.mod_names[i]);
        }
    }
    return result_mods;
}
exports.ModsIntToText = ModsIntToText;
