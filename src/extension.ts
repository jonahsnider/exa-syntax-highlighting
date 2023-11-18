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
				'TEST R/N = R/N',
				'TEST MRD/EOF',
				'TJMP L',
				'VOID F',
			];

			// refer to later comment
			// type ArgMap = Record<string, string>;
			// const argMap: ArgMap = {
			// 	// Found these slower than just pressing space
			// 	// '=': '|=,<,>|',
			// 	// 'R': '|X,T,F,M|',
			// 	'MRD/EOF': '|MRD,EOF|',
			// };

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

				// This is a nice idea but all the tab pressing is worse than just pressing space
				// It would work if the default completion could be changed to space just for this extension
				// for (const [i, label] of split.slice(1).entries()) {
				// 	let annotation = `:${label}`;
				// 	if (label in argMap) {
				// 		annotation = argMap[label];
				// 	}
				// 	elements.push(`\${${i + 1}${annotation}}`);
				// }

				c.insertText = new vscode.SnippetString(elements.join(' '));
				completions.push(c);
			}
			return completions;
		}
	});

	context.subscriptions.push(provider);
}