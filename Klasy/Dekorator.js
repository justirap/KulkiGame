"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A decorator that rotates the boards by 90 degrees */
function dekorowanie(target, name, descriptor) {
    var array1;
    var tablica;
    let oryg = descriptor.value; // zapisuję oryginał metody
    descriptor.value = function (...args) {
        tablica = args[0];
        if (args[1] == 1) {
            array1 = [["0"]];
            for (var a = 0; a < 9; a++) {
                array1[a] = ['0'];
            }
            for (let b = 0; b < 9; b++) {
                for (let c = 0; c < 9; c++) {
                    array1[b][c] = '0';
                }
            }
            for (let i = 0; i < 9; ++i) {
                for (let j = 0; j < 9; ++j) {
                    array1[i][9 - j - 1] = tablica[j][i];
                }
            }
            args[0] = array1;
        }
        else {
            args[0] = tablica;
        }
        let result = oryg.apply(this, args); // "wykonuję" starą
        return result;
    };
    return descriptor;
}
exports.default = dekorowanie;
