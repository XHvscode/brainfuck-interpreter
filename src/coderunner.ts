import * as vscode from 'vscode';
import * as xh from './xh';

export function runCode(code: string, outputChannel: vscode.OutputChannel) {
    xh.complieXH2Funcion(code)(
        () => {
            return 0;
        },
        (byte: number) => {
            outputChannel.append(String.fromCharCode(byte));
        }
    );
}
