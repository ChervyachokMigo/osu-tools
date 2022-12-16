export type Byte = number;
export type Bool = boolean;
export type Short = number;
export type Int = boolean | number | bigint;
export type Int64 = bigint;
export type DateTime = Date;
export type Long = Date;
export type Single = number;
export type Double = number;
export type IntDoublePair = {
    int: number,
    double: number
}
export type TimingPoint = {
    bpm: Double,
    offset: Double,
    is_inherit: Bool
}
export type ULEB128 = number;
