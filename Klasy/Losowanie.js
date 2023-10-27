"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Class including drawing balls and setting them in the table */
class Losowanie {
    constructor(owner, tablica1 = [["0"]]) {
        this.nazwa = owner;
        this.tablica = tablica1;
    }
    /**
 * Sets the ball preview
 *
 * @param podglad The HTMLDivElement where the preview will be
 * @returns Returns an array of random balls for preview
 */
    UstawPodglad(podglad) {
        podglad.innerHTML = "";
        var wylosowane = [1, 2, 3];
        for (let i = 0; i < 3; i++) {
            wylosowane[i] = Math.floor(Math.random() * 7) + 1;
            let obrazek = document.createElement("img");
            obrazek.src = "./img/" + wylosowane[i].toString() + ".png";
            obrazek.style.margin = "8px";
            obrazek.width = 40;
            obrazek.height = 40;
            podglad.appendChild(obrazek);
        }
        // console.log(wylosowane);
        return wylosowane;
    }
    /**
* Sets the balls in array
*
* @param mapa The array of balls to be placed in the array
* @param tablica The array they are to be placed on
* @returns Returns an array of balls
*/
    UstawwTabKulki(mapa, tablica) {
        var licznik = 0;
        var warunek = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (tablica[i][j] == "0") {
                    warunek++;
                }
            }
        }
        if (warunek == 1) {
            warunek = 1;
        }
        else if (warunek == 2) {
            warunek = 2;
        }
        else if (warunek >= 3) {
            warunek = 3;
        }
        while (licznik < warunek) {
            var x = Math.floor(Math.random() * 9) + 0;
            var y = Math.floor(Math.random() * 9) + 0;
            if (tablica[x][y] == "0") {
                tablica[x][y] = mapa[licznik].toString();
                licznik++;
            }
        }
        this.tablica = tablica;
        return tablica;
    }
    /**
    *  Displays the contents of an array
   */
    StanTablicy() {
        console.log(this.tablica);
    }
}
exports.default = Losowanie;
