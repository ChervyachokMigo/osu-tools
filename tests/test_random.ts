
import { beatmap_property } from '../built/consts/property_settings';


var s = ['Animation', '0'];

for (let i of s){


    console.log (i, typeof i, Number(i), isNaN(Number(i)), i.startsWith('Animation') )

}

/*
var beatmap_properties_names: typeof beatmap_property[] = 
Object.values(beatmap_property).filter( (value) => typeof value === 'string')  as typeof beatmap_property[];
console.log(beatmap_properties_names )*/