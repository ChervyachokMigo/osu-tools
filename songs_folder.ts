import * as fs from 'fs';
import { validateHeaderName } from 'http';

/*export interface Folder  {
    path: string;
    count?: number;
}*/

export type Folder = {
    path: string,
    files: Array<fs.Dirent>,
    count: number
}

/**
 * Returns folders of folder
 * @param path - path to read files
 * @returns Folder - (path: string, files: Array of Dirent, count: number of files)
 */
export function getFiles(path: string): Folder {
    var result: Folder = {path: path, files: [], count: 0};
    try{
        result.files = fs.readdirSync(path, {encoding: 'utf-8', withFileTypes: true});
        result.files = result.files.filter(val=>val.isDirectory())
        result.count = result.files.length;
    } catch (er){
        console.log('Error: can not read the folder', path);
    }
    return result;
}