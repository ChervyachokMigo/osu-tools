"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display_progress = exports.display_progress_reset = void 0;
let start_time = new Date().valueOf();
let avg_times = [];
const display_progress_reset = () => {
    start_time = new Date().valueOf();
    avg_times = [];
};
exports.display_progress_reset = display_progress_reset;
const display_progress = ({ counter, one_percent, length, is_display_time, is_print_progress }) => {
    if (typeof is_print_progress === 'undefined') {
        is_print_progress = true;
    }
    if (typeof is_display_time === 'undefined') {
        is_display_time = false;
    }
    if (is_print_progress && counter % one_percent == 0) {
        const progress = ((counter / length * 10000) / 100).toFixed(1);
        const progress_time = { part: '', avg: '' };
        if (is_display_time) {
            const endtime = (new Date().valueOf() - start_time) * 0.001;
            progress_time.part = 'end for ' + endtime.toFixed(3);
            start_time = new Date().valueOf();
            avg_times.push(endtime);
            progress_time.avg = 'avg time ' + (avg_times.reduce((a, b) => a + b) / avg_times.length).toFixed(3);
        }
        const time = is_display_time ? ' | ' + Object.values(progress_time).join(' | ') : '';
        process.stdout.write(progress + '% complete' + time + '\r');
    }
};
exports.display_progress = display_progress;
