export default LZMA;
declare namespace LZMA {
    export { compress };
    export { decompress };
}
/** cs */
declare function compress(str: any, mode: any, on_finish: any, on_progress: any): any;
/** ce */
/** ds */
declare function decompress(byte_arr: any, on_finish: any, on_progress: any): any;
//# sourceMappingURL=lzma_worker.d.ts.map