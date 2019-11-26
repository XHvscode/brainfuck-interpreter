function complieXH(code: string): string {
    let comCode: string = "(function(r,w){var i=0;var t=new Uint8Array(30000);";
    let i: number;
    let countChars = function (char: string) {
        let c = 0;
        while (code.charAt(i) === char) {
            c++; i++;
        }
        i--;
        return c;
    };
    for (i = 0; i < code.length; i++) {
        switch (code.charAt(i)) {
            case "<":
                comCode += "i-=" + countChars("<") + ";";
                break;
            case ">":
                comCode += "i+=" + countChars(">") + ";";
                break;
            case "+":
                comCode += "t[i]+=" + countChars("+") + ";";
                break;
            case "-":
                comCode += "t[i]-=" + countChars("-") + ";";
                break;
            case ",":
                comCode += "t[i]=r()";
                break;
            case "[":
                comCode += "while(t[i]!=0){";
                break;
            case "]":
                comCode += "}";
                break;
            case ".":
                comCode += "w(t[i]);";
                break;
        }
    }
    comCode += "return t;})";
    console.log(comCode);
    return comCode;
}

// 第一个是读取方法，也就是xh需要从控制台读取一个字符时会回调的方法，你需要返回该字符在字符表中的位置
// 第二个方法是写入方法，改方法是xh需要向控制台输出一个字符时的回调方法，输出的字符就是那个byte: number，是该字符在字符表中的位置。
export function complieXH2Funcion(code: string): (
    readFunction: () => number,
    writeFunction: (byte: number) => void) => Uint8Array {
    return eval(complieXH(code));
}