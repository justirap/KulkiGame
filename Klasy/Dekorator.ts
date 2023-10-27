
/** A decorator that rotates the boards by 90 degrees */
export default function dekorowanie(target: Object, name: string, descriptor: PropertyDescriptor) {
    var array1: Array<any>;
    var tablica: Array<any>;

    let oryg = descriptor.value; // zapisuję oryginał metody
    descriptor.value = function (...args: any[]) { // tworzę nową metodę mając dostęp do this i argumentów oryginalnej
        tablica = args[0];
        if (args[1] == 1) {

            array1 = [["0"]]
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
    }
    return descriptor
}