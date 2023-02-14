/// <reference types="node" />
export declare function decompressAsync(buffer: Buffer, on_finish: Function): Promise<void>;
export declare const decompressLZMASync: (buffer: Buffer) => string;
export declare function compressAsync(str: string, mode: number, on_finish: Function): Promise<void>;
export declare const compressLZMASync: (str: string, mode: number) => Buffer;
//# sourceMappingURL=decompressLZMASync.d.ts.map