/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider('exa', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const completions = [];

			// Don't double autocomplete
			const linePrefix = document.lineAt(position).text.slice(0, position.character);
			if (linePrefix.includes(' ')) {
				return undefined;
			}

			const lines = [
				'DROP',
				'HALT',
				'KILL',
				'MAKE',
				'MODE',
				'NOOP',
				'WIPE',

				'COPY R/N R',
				'ADDI R/N R/N R',
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
				'TEST EOF',
				'TEST MRD',
				'TEST R/N = R/N',
				'TJMP L',
				'VOID F',
			];

			for (const line of lines) {
				const split = line.split(' ');
				const k = split[0];
				const c = new vscode.CompletionItem(k);
				const elements = [k];
				for (const [i, label] of split.slice(1).entries()) {
					if (label == "R") {
						elements.push(`\${${i + 1}|X,T,F,M|}`);
					} else {
						elements.push(`\${${i + 1}:${label}}`);
					}
				}
				c.insertText = new vscode.SnippetString(elements.join(' '));
				completions.push(c);
			}
			return completions;
		}
	});

	context.subscriptions.push(provider);
}