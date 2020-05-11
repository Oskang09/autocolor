import { Converter } from "../interface";
import { RGBObject } from "../utils";

export class DartConverter implements Converter {
    name: String = "Dart";

    public writeRGBO(rgb: RGBObject): string {
        const { r, g, b, o } = rgb;
        return `Colors.fromRGB0(${r}, ${g}, ${b}, ${Number(o) / 100})`;
    }

    public writeARGB(rgb: RGBObject): string {
        const { r, g, b, o } = rgb;
        const bit = Number(o) << 8;
        const a = Math.floor(bit / 100) - 1;
        return `Colors.fromARGB(${a}, ${r}, ${g}, ${b})`;
    }

}