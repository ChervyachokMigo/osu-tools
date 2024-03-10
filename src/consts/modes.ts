
import * as bitwise from 'bitwise';

export const mod_names = [
    'NoFail',     'Easy',
    'TouchDevice', 'Hidden',     'HardRock',
    'SuddenDeath', 'DoubleTime', 'Relax',
    'HalfTime',    'Nightcore',  'Flashlight',
    'Autoplay',    'SpunOut',    'Relax2',
    'Perfect',     'Key4',       'Key5',
    'Key6',        'Key7',       'Key8',
    'FadeIn',      'Random',     'Cinema',
    'Target',      'Key9',       'KeyCoop',
    'Key1',        'Key3',       'Key2',
    'ScoreV2',     'Mirror'
];

export const mod_names_short = [
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


export const mod_names_short_to_long = {
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

export function ModsIntToShortText (modsBits: number) {
    if (modsBits == 0){
        return ['No Mods'];
    }

    let result_mods = [];

    for (let i = 0 ; i < 32; i++){
        let bit = bitwise.integer.getBit(modsBits, i);
        if (bit){
            result_mods.push(mod_names_short[i]);
        }
        
    }
    
    return result_mods
}

export function ModsIntToText (modsBits: number) {
    if (modsBits == 0){
        return ['No Mods'];
    }

    let result_mods = [];

    for (let i = 0 ; i < 32; i++){
        let bit = bitwise.integer.getBit(modsBits, i);
        if (bit){
            result_mods.push(mod_names[i]);
        }
        
    }
    
    return result_mods
}
