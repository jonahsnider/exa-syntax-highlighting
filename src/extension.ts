/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider('exa', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const completions = [];

			// Handle @{} and don't double autocomplete other commands.
			const linePrefix = document.lineAt(position).text.slice(0, position.character);
			if (linePrefix.includes(' ')) {
				const moveCursorCommand: vscode.Command = {
					title: "Move cursor left between brackets",
					command: "cursorLeft"
				};
				const c = new vscode.CompletionItem('@{}');
				c.command = moveCursorCommand;
				c.range = new vscode.Range(position.translate(0, -1), position);
				completions.push(c);
				return completions;
			}

			const lines = [
				'@END',
				'DROP',
				'HALT',
				'KILL',
				'MAKE',
				'MODE',
				'NOOP',
				'WIPE',

				'@REP N',
				'ADDI R/N R/N R',
				'COPY R/N R',
				'DIVI R/N R/N R',
				'FILE R',
				'FJMP L',
				'GRAB R/N',
				'HOST R',
				'JUMP L',
				'LINK R/N',
				'MARK L',
				'MODI R/N R/N R',
				'MULI R/N R/N R',
				'RAND R/N R/N R',
				'REPL L',
				'SEEK R/N',
				'SUBI R/N R/N R',
				'SWIZ R/N R/N R',
				'TEST MRD/EOF',
				'TEST R/N = R/N',
				'TJMP L',
				'VOID F',
			];

			for (const line of lines) {
				const split = line.split(' ');
				const k = split[0];
				const c = new vscode.CompletionItem(line);
				const elements = [k];
				if (split.length > 1) {
					if (split[1] == 'MRD/EOF') {
						elements.push("${1|MRD,EOF|}");
					} else {
						// Just add space to end so command can be followed immediately by argument
						elements.push('');
					}
				}
				if (k.startsWith('@')) {
					c.range = new vscode.Range(position.translate(0, -1), position);
				}

				c.insertText = new vscode.SnippetString(elements.join(' '));
				completions.push(c);
			}
			return completions;
		},

	}, '@');

	context.subscriptions.push(provider);
}