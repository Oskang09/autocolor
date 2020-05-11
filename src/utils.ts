import * as vscode from 'vscode';
import { ColorConversion } from './interface';

// const hexWithOpacityRegex = 

export type RGBObject = {
    r: Number,
    g: Number,
    b: Number
    o: Number | undefined,
};

export function hexSyntaxEdit(document: vscode.TextDocument, range: vscode.Range, edit: vscode.WorkspaceEdit, fn: ColorConversion): vscode.WorkspaceEdit {
    const start = range.start;
    const line = document.lineAt(start.line);
    const matcher = line.text.match(/#([a-f\d]{3,6})(_)?(\d{1,3})?/i);
    if (matcher) {
        const [full, hex, dash, opacity] = matcher;
        let rgbo: RGBObject | undefined;
        if (hex.length === 3) {
            rgbo = getRGBObject(hex[0], hex[1], hex[2], opacity);
        } else if (hex.length === 6) {
            rgbo = getRGBObject(
                hex[0] + hex[1],
                hex[2] + hex[3],
                hex[4] + hex[5],
                opacity,
            );
        }

        if (rgbo) {
            const startIndex = line.text.indexOf(full);
            const endIndex = startIndex +
                full.length +
                (dash ? 1 : 0) +
                (dash && opacity ? opacity.length : 0);
            const replacement = new vscode.Range(range.start.line, startIndex, range.start.line, endIndex);
            edit.replace(document.uri, replacement, fn(rgbo));
        }
    }
    return edit;
}

export function isHexSyntax(document: vscode.TextDocument, range: vscode.Range): boolean {
    const start = range.start;
    const line = document.lineAt(start.line);
    const matcher = line.text.match(/#([a-f\d]{3,6})(_)?(\d{1,3})?/i);
    if (matcher) {
        const [_, hex] = matcher;
        return hex.length === 3 || hex.length === 6;
    }
    return false;
}

function componentToHex(c: Number) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: Number, g: Number, b: Number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getRGBObject(r: string, g: string, b: string, o: string | undefined): RGBObject {
    if (r.length === 1) {
        r += r;
        g += g;
        b += b;
    }
    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
        o: o ? Number(o) : 100,
    };
}