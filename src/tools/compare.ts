import md5File from 'md5-file';

export const compare_files = ( file_1: string, file_2: string) => {
    const md5_1 = md5File.sync(file_1);
    const md5_2 = md5File.sync(file_2);
    return md5_1 === md5_2;
}