export type display_progress_args = {
    counter: number;
    one_percent: number;
    length: number;
    is_display_time: boolean | undefined;
    is_print_progress: boolean | undefined;
};
export declare const display_progress_reset: () => void;
export declare const display_progress: ({ counter, one_percent, length, is_display_time, is_print_progress }: display_progress_args) => void;
//# sourceMappingURL=display_progress.d.ts.map