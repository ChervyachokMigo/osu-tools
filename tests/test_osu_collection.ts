import * as osu_tools from '../built/index.js';

console.time('complete');

//28.644s
const results = osu_tools.collection_db_load( 'NM-S+-96%+ 500-550+pp.osdb');

console.log(results);

console.timeEnd('complete');

setTimeout( ()=>{ return true; }, 1000000 );