// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as runner from './coderunner';
import { BrainfuckCompletionItemProvider } from './autocomplete';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to outputChannel diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "brainfuck" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.runBrainfuck', (url) => {
        // The code you place here will be executed every time your command is executed

        const outputChannel = vscode.window.createOutputChannel("brainfuck Interpreter");
        outputChannel.show();
        try {
            console.log(url.path);
            const sourceCode = fs.readFileSync(url.path).toString();
            const output = runner.runCode(sourceCode, outputChannel);
        }
        catch (e) {
            outputChannel.appendLine("Error:" + e.messge);
        }

    });

    context.subscriptions.push(disposable);

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { language: "brainfuck", scheme: "file" },
            new BrainfuckCompletionItemProvider(),
            "+", "-"
        )
    );
}

// this method is called when your extension is deactivated
export function deactivate() { }
