"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract_all = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const exe = path_1.default.join(__dirname, '..', '..', 'bin', '7z.exe');
const extnames = ['.osz', '.zip', '.7z', '.rar'];
const extract_all = (archieve_path, is_delete_after = false) => {
    const extname = path_1.default.extname(archieve_path);
    const extname_index = extnames.indexOf(extname);
    if (extname_index === -1) {
        return false;
    }
    const filename = path_1.default.basename(archieve_path, extnames[extname_index]);
    const filename_ext = path_1.default.basename(archieve_path);
    const absolute_folder_path = path_1.default.dirname(archieve_path);
    const absolute_extract_path = path_1.default.join(path_1.default.dirname(archieve_path), filename);
    if ((0, fs_1.existsSync)(absolute_extract_path)) {
        console.log('file already extracted, skip', archieve_path, absolute_extract_path);
        return false;
    }
    else {
        console.log('extracting', filename_ext, 'to', absolute_extract_path);
        const args = [
            'x',
            '-bd',
            filename_ext,
            `-o${absolute_extract_path}`,
        ];
        const { stderr, stdout } = (0, child_process_1.spawnSync)(exe, args, { encoding: 'utf8', cwd: absolute_folder_path });
        if (stderr) {
            console.log('stderr', stderr);
            throw new Error(stderr);
        }
        if (stdout) {
            console.log('stdout', stdout);
            if (is_delete_after)
                (0, fs_1.rmSync)(archieve_path);
            return false;
        }
    }
};
exports.extract_all = extract_all;
