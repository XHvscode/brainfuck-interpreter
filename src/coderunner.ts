import * as vscode from 'vscode';
import * as brainfuck from './brainfuck';

export function runCode(code: string, outputChannel: vscode.OutputChannel) {
    var counter = 0;
    brainfuck.complieBrainfunck2Funcion(code)(
        () => {
            return 0;
        },
        (byte: number) => {
            outputChannel.append(String.fromCharCode(byte));
        }
    );
}
