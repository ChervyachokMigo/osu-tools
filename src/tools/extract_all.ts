import { spawnSync } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import path from "path";

const exe = path.join(__dirname, '..', '..', 'bin', '7z.exe');
const extnames = ['.osz', '.zip', '.7z', '.rar'];

export const extract_all = ( archieve_path: string, is_delete_after = false ) => {
	const extname = path.extname( archieve_path );

	const extname_index = extnames.indexOf( extname );

	if (extname_index === -1){
        return false;
    }

	const filename = path.basename(archieve_path, extnames[extname_index]);
	const filename_ext = path.basename(archieve_path);

	const absolute_folder_path = path.dirname(archieve_path);
	const absolute_extract_path = path.join( path.dirname(archieve_path), filename );

	if (existsSync(absolute_extract_path)){
		console.log('file already extracted, skip', archieve_path, absolute_extract_path);
		return false;
	} else {
		console.log('extracting', filename_ext, 'to', absolute_extract_path);
		const args = [ 
			'x',    //extract files
			'-bd',
			filename_ext,
			`-o${absolute_extract_path}`,
		];
		const { stderr, stdout} = spawnSync(exe, args, { encoding: 'utf8', cwd: absolute_folder_path });

		if (stderr) {
			console.log('stderr', stderr);
			throw new Error(stderr);
		}

		if (stdout) {
			console.log('stdout', stdout);
			if (is_delete_after)
				rmSync(archieve_path);
			return false;
		}
		
	}
	
}