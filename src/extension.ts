import * as vscode from 'vscode';
import { Reader } from './reader';

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("autocolor");
	const hasEnabled = config.get('enabled', true);

	if (hasEnabled) {
		const reader = vscode.languages.registerCodeActionsProvider(
			{ scheme: 'file' },
			new Reader(),
			{
				providedCodeActionKinds: [
					vscode.CodeActionKind.QuickFix
				],
			}
		);
		context.subscriptions.push(reader);
	}
}

export function deactivate() { }