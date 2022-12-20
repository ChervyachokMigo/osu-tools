const { loopWhile } = require('deasync');
import * as LZMA from './lzma_worker';

export async function decompressAsync(buffer: Buffer, on_finish: Function): Promise<void> { 
    var finish_result = '';
    await new Promise ( async (resolve, reject)=>{
        LZMA.default.decompress(buffer, decompress_finish );
        function decompress_finish(result: string, error: string) {
            if (error) {
                console.error(error)
                reject('can not decode string');
            }
            resolve(result);
        }
    }).then( value =>{
        finish_result = typeof value === 'string' ? value : '';
    }).catch(error =>{
        throw new Error(error);
    });
    on_finish(finish_result);
}

export const decompressLZMASync = function (buffer: Buffer): string {
    var done = false;
    var data: string = '';
    decompressAsync(buffer, function cb(result: string) {
        data = result;
        done = true;
    });
    loopWhile(function () { return !done; });
    return data;
};
