"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModsShortTextToInt = exports.ModsTextToInt = exports.ModsIntToText = exports.ModsIntToShortText = exports.mod_names_short_to_long = exports.mod_names_short = exports.mod_names = void 0;
const bitwise = __importStar(require("bitwise"));
exports.mod_names = [
    'NoFail', 'Easy',
    'TouchDevice', 'Hidden', 'HardRock',
    'SuddenDeath', 'DoubleTime', 'Relax',
    'HalfTime', 'Nightcore', 'Flashlight',
    'Autoplay', 'SpunOut', 'Relax2',
    'Perfect', 'Key4', 'Key5',
    'Key6', 'Key7', 'Key8',
    'FadeIn', 'Random', 'Cinema',
    'Target', 'Key9', 'KeyCoop',
    'Key1', 'Key3', 'Key2',
    'ScoreV2', 'Mirror'
];
exports.mod_names_short = [
    'NF', 'EZ',
    'TD', 'HD', 'HR',
    'SD', 'DT', 'RX',
    'HT', 'NC', 'FL',
    'AP', 'SP', 'RX2',
    'PF', 'K4', 'K5',
    'K6', 'K7', 'K8',
    'FI', 'RD', 'CI',
    'TA', 'K9', 'KC',
    'K1', 'K3', 'K2',
    'V2', 'MI'
];
exports.mod_names_short_to_long = {
    'NF': 'NoFail',
    'EZ': 'Easy',
    'TD': 'TouchDevice',
    'HD': 'Hidden',
    'HR': 'HardRock',
    'SD': 'SuddenDeath',
    'DT': 'DoubleTime',
    'RX': 'Relax',
    'HT': 'HalfTime',
    'NC': 'Nightcore',
    'FL': 'Flashlight',
    'AP': 'Autoplay',
    'SP': 'SpunOut',
    'RX2': 'Relax2',
    'PF': 'Perfect',
    'K4': 'Key4',
    'K5': 'Key5',
    'K6': 'Key6',
    'K7': 'Key7',
    'K8': 'Key8',
    'FI': 'FadeIn',
    'RD': 'Random',
    'CI': 'Cinema',
    'TA': 'Target',
    'K9': 'Key9',
    'KC': 'KeyCoop',
    'K1': 'Key1',
    'K3': 'Key3',
    'K2': 'Key2',
    'V2': 'ScoreV2',
    'MI': 'Mirror'
};
function ModsIntToShortText(modsBits) {
    if (modsBits == 0) {
        return ['No Mods'];
    }
    let result_mods = [];
    for (let i = 0; i < 32; i++) {
        let bit = bitwise.integer.getBit(modsBits, i);
        if (bit) {
            result_mods.push(exports.mod_names_short[i]);
        }
    }
    return result_mods;
}
exports.ModsIntToShortText = ModsIntToShortText;
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
const ModsTextToInt = (mods) => {
    if (mods.includes('No Mods')) {
        return 0;
    }
    let result = 0;
    for (let i = 0; i < exports.mod_names.length; i++) {
        if (mods.indexOf(exports.mod_names[i]) > -1) {
            result = result | 1 << i;
        }
    }
    return result;
};
exports.ModsTextToInt = ModsTextToInt;
const ModsShortTextToInt = (mods) => {
    if (mods.includes('No Mods')) {
        return 0;
    }
    let result = 0;
    for (let i = 0; i < exports.mod_names_short.length; i++) {
        if (mods.indexOf(exports.mod_names_short[i]) > -1) {
            result = result | 1 << i;
        }
    }
    return result;
};
exports.ModsShortTextToInt = ModsShortTextToInt;
