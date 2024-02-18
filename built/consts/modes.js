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
exports.ModsIntToText = exports.ModsIntToShortText = exports.mod_names_short = exports.mod_names = void 0;
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
