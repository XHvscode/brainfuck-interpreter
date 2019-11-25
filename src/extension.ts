// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as runner from './coderunner';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "xh" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.runXH', (path) => {
        // The code you place here will be executed every time your command is executed

        const output = vscode.window.createOutputChannel("xh Interpreter");
        output.show();
        try {
            // output.appendLine(path);
            // const sourceCode = fs.readFileSync(path.path).toString();
            const sourceCode = "++++++ [ > ++++++++++ < - ] > +++++ .";
            runner.runCode(sourceCode, output);
        }
        catch (e) {
            output.appendLine("Error:" + e.messge);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
