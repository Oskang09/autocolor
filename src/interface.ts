import { RGBObject } from "./utils";
import { DartConverter } from "./dart/converter";

export type ColorConversion = (rgb: RGBObject) => string;
export type Converter = {
    name: String,
    writeRGBO: ColorConversion,
    writeARGB: ColorConversion,
};

type Converters = {
    [keyof: string]: Converter,
};

export const convertes: Converters = {
    'dart': new DartConverter(),
};