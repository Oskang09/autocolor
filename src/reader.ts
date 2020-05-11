import * as vscode from 'vscode';
import { isHexSyntax, hexSyntaxEdit } from './utils';
import { convertes, ColorConversion } from './interface';

export class Reader implements vscode.CodeActionProvider {

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] | undefined {
        if (!isHexSyntax(document, range)) {
            return;
        }

        const converter = convertes[document.languageId];
        if (converter) {
            const fixRGBO = this.createFix(document, range, `Convert from HEX to RGBO ( ${converter.name} )`, converter.writeRGBO);
            const fixARGB = this.createFix(document, range, `Convert from HEX to ARGB ( ${converter.name} )`, converter.writeARGB);
            fixRGBO.isPreferred = true;
            return [fixRGBO, fixARGB];
        }
        return;
    }

    private createFix(document: vscode.TextDocument, range: vscode.Range, display: string, conversion: ColorConversion): vscode.CodeAction {
        const fix = new vscode.CodeAction(display, vscode.CodeActionKind.QuickFix);
        fix.edit = hexSyntaxEdit(document, range, new vscode.WorkspaceEdit(), conversion);
        return fix;
    }
};