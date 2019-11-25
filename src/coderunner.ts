import * as vscode from 'vscode';
import * as xh from './xh';

export function runCode(code: string, input: string, outputChannel: vscode.OutputChannel) {
    var counter = 0;
    xh.complieXH2Funcion(code)(
        () => {
            if (counter < input.length) {
                return input.charCodeAt(counter++);
            }
            return 0;
        },
        (byte: number) => {
            outputChannel.append(String.fromCharCode(byte));
        }
    );
}
