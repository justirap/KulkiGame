import Nazwa from "./Interfejs1"
import Tablica from "./Interfejs2"
import Losowanie from './Losowanie';
import dekorowanie from './Dekorator';
const losowanie: Losowanie = new Losowanie("losowanie");

/** Class related to generation and movement on the board */
export default class Plansza implements Nazwa, Tablica {
    nazwa: string;
    tablica: Array<any>
    static powkulka: HTMLImageElement;
    static S: HTMLImageElement;
    static tabela: HTMLTableElement;
    static podglad: any
    static obrot: any;
    static warunek: string;
    static CzyPrzes: string;
    static TAB: Array<any>;
    static TAB2: Array<any>;
    static tab1: Array<any>
    static tab2: Array<any>
    static obiekt: Plansza;
    static dzieci: HTMLCollection;
    static wylosowane = [1, 2, 3];
    static mapa = [1, 2, 3];
    static sciezka = "0";
    static tabsciezki: Array<string>
    static punkty: number;
    static punktyP: HTMLParagraphElement;
    static czas: any;

    constructor(owner: string, tablica1 = [["0"]],) {
        this.nazwa = owner;
        this.tablica = tablica1;
    }

    /** Calling the method for drawing balls*/
    Wylosuj(): void {
        Plansza.TAB = losowanie.UstawwTabKulki(Plansza.wylosowane, Plansza.TAB)
        Plansza.wylosowane = losowanie.UstawPodglad(Plansza.podglad);
    }

    /**
     * Calls functions that are equivalent to one game round.
     *
 
     * @param plansza The object of Plansza Class
     * @param war Condition to the decorator (0,1)
     */
    @dekorowanie
    Runda(plansza: Array<any>, war: number): void {
        var licznik1: number;
        licznik1 = 0;
        if (war == 0) {
            Plansza.punkty = 0;
        }
        setTimeout(function () {

            Plansza.obiekt.Zbijanie();
            if (war == 1) {
                Plansza.obrot.style.visibility = "visible";

                setTimeout(function () {
                    Plansza.obrot.style.visibility = "hidden";
                }, 200)
            }
            Plansza.obiekt.OdswiezPlansza(Plansza.tabela, plansza, 1)
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    if (Plansza.TAB[i][j] == "0") {
                        licznik1++
                    }
                }
            }
            if (licznik1 == 0) {
                var myTime = new Date();
                var timeNow = myTime.getTime();
                var timeDiff = timeNow - Plansza.czas;
                timeDiff = timeDiff / 1000;
                alert("Koniec gry\nUzyskane punkty: " + Plansza.punkty.toString() + "\nCzas gry: " + timeDiff.toString() + " sekund")
            }

        }, 250);

        Plansza.TAB = plansza;




    }
    /**
     * Generates an empty board.
     *
     * @param tab The HTMLTableElement where the board will be
     * @param tablica The array of balls
     * @param plansza The object of Plansza Class
     * @param podglad The HTMLDivElement where the preview will be
     * @param obrot The HTMLImgElement where the image of arrows is
     * @returns The array of balls
     */
    PustaPlansza(tab: any, tablica: Array<any>, plansza: Plansza, podglad: any, obrot: any, punkty: any): Array<any> {
        for (var i = 0; i < 9; i++) {
            tablica[i] = ['0'];
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                tablica[i][j] = '0';
            }
        }

        var startday = new Date();
        var clockStart = startday.getTime();
        Plansza.czas = clockStart;

        for (var i = 0; i < 9; i++) {
            var wiersz = document.createElement("tr");
            for (var j = 0; j < 9; j++) {
                var pole = document.createElement("td");
                pole.style.width = '50px';
                pole.style.height = '50px';
                pole.dataset.wys = i.toString();
                pole.dataset.szer = j.toString();

                pole.style.border = "1px solid black";

                pole.style.backgroundColor = "white";

                wiersz.appendChild(pole);
            }
            tab.appendChild(wiersz);
        }
        this.tablica = tablica;
        Plansza.tabela = tab;
        Plansza.TAB = tablica;
        Plansza.obiekt = plansza
        Plansza.podglad = podglad;
        Plansza.obrot = obrot;
        Plansza.punktyP = punkty;
        for (let i = 0; i < 3; i++) {
            Plansza.mapa[i] = Math.floor(Math.random() * 7) + 1;
        }
        return tablica;
    }



    /**
     * Refreshes the look of the board.
     *
     * @param tab The HTMLTableElement where the board will be
     * @param tablica The array of balls
     * @param war The condition for overwriting the variable
     * @returns The array of balls
     */
    OdswiezPlansza(tab: any, tablica: Array<any>, war: number): void {
        var liczby = ["1", "2", "3", "4", "5", "6", "7"]
        tab.innerHTML = "";
        for (var i = 0; i < 9; i++) {
            var wiersz = document.createElement("tr");
            for (var j = 0; j < 9; j++) {
                var pole = document.createElement("td");
                pole.style.width = '50px';
                pole.style.height = '50px';
                pole.style.textAlign = "center";
                pole.dataset.wys = i.toString();
                pole.dataset.szer = j.toString();

                pole.style.border = "1px solid black";
                for (var k = 0; k < liczby.length; k++) {
                    if (tablica[i][j] == liczby[k]) {
                        let obrazek = document.createElement("img");
                        obrazek.src = "./img/" + liczby[k] + ".png";
                        obrazek.width = 34;
                        obrazek.height = 34;
                        pole.style.backgroundColor = "white";
                        pole.appendChild(obrazek);
                        pole.addEventListener('click', this.WybierzKulke);
                    }
                    if (tablica[i][j] == '0') {
                        pole.style.backgroundColor = "white";
                        pole.style.color = "white";
                        pole.id = i.toString() + "_" + j.toString();
                        pole.addEventListener("mouseover", this.Podswietl);
                        pole.addEventListener("click", this.Przesun);
                    }

                    //  if (tablica[i][j] == 'A') {
                    //      pole.style.backgroundColor = "#B22222";
                    //      pole.style.color = "white";
                    //  pole.id = i.toString() + "_" + j.toString();
                    //   pole.addEventListener("onmouseover", this.Podswietl);
                    //  }

                }

                wiersz.appendChild(pole);
            }
            tab.appendChild(wiersz);
        }
        if (war == 1) {
            this.tablica = tablica;
            Plansza.TAB = tablica;
        }
        var kom = document.createElement("td");
        Plansza.TAB2 = [[kom]]
        for (var i = 0; i < 9; i++) {
            Plansza.TAB2[i] = [kom];
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                Plansza.TAB2[i][j] = kom;
            }
        }
        Plansza.dzieci = Plansza.tabela.children;

        for (var x = 0; x < Plansza.dzieci.length; x++) {
            var dziecko = Plansza.dzieci[x].children
            for (var c = 0; c < 9; c++) {
                Plansza.TAB2[x][c] = dziecko[c];
            }
        }
    }


    /**
    * Allows you to select a ball
    *
    * @param e The object corresponding to the ball
    */
    WybierzKulke(e: any): void {

        var kulka = e.currentTarget;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                Plansza.TAB2[i][j].style.backgroundColor = "white";
            }
        }
        // console.log(kulka)
        var dzieci = kulka.children;
        if (dzieci[0] == Plansza.powkulka && Plansza.powkulka.height == 44) {
            Plansza.warunek = 'false';
            Plansza.powkulka.height = 34;
            Plansza.powkulka.width = 34;
        }
        else {
            if (Plansza.powkulka != undefined) {
                Plansza.powkulka.height = 34;
                Plansza.powkulka.width = 34;
            }
            Plansza.warunek = 'true';
            dzieci[0].width = 44;
            dzieci[0].height = 44;
            Plansza.powkulka = dzieci[0];
            Plansza.S = kulka;
        }
    }

    /**
 * Allows you to mark the place to move the ball
 *
 * @param e The place on the board
 */
    Podswietl(e: any): void {
        var pole = e.currentTarget;
        var start: HTMLElement;
        var warunekM = "false";

        start = Plansza.S;
        Plansza.tab1 = [["0"]]
        for (var i = 0; i < 9; i++) {
            Plansza.tab1[i] = ['0'];
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                Plansza.tab1[i][j] = '0';
            }
        }

        Plansza.tab2 = [["0"]]
        for (var i = 0; i < 9; i++) {
            Plansza.tab2[i] = ['0'];
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                Plansza.tab2[i][j] = '0';
            }
        }

        if (Plansza.warunek == "true") {

            for (let i = 0; i < Plansza.TAB.length; i++) {
                for (let j = 0; j < Plansza.TAB.length; j++) {
                    if (Plansza.TAB[i][j] != '0') {
                        Plansza.tab1[i][j] = "X"
                    }
                    else {
                        Plansza.tab1[i][j] = Plansza.TAB[i][j];
                    }
                }
            }
            Plansza.tab1[parseInt(pole.dataset.wys)][parseInt(pole.dataset.szer)] = "M";
            if (start.dataset.szer != undefined && start.dataset.wys != undefined) {
                Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer)] = "S";

                if (parseInt(start.dataset.wys) - 1 > -1) {
                    //jesli pole nad jest 0
                    if (Plansza.tab1[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] == '0') {
                        Plansza.tab1[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] = '1'
                        Plansza.tab2[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] = start.dataset.wys + "_" + start.dataset.szer;
                    }
                }


                if (parseInt(start.dataset.szer) + 1 < 9) {
                    //jesli pole z prawej jest 0
                    if (Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] == '0') {
                        Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] = '1'
                        Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] = start.dataset.wys + "_" + start.dataset.szer;
                    }
                }

                if (parseInt(start.dataset.wys) + 1 < 9) {
                    //jesli pole pod jest 0
                    if (Plansza.tab1[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] == '0') {
                        Plansza.tab1[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] = '1'
                        Plansza.tab2[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] = start.dataset.wys + "_" + start.dataset.szer;
                    }
                }

                if (parseInt(start.dataset.szer) - 1 > -1) {
                    //jesli pole z lewej jest 0
                    if (Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] == '0') {
                        Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] = '1'
                        Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] = start.dataset.wys + "_" + start.dataset.szer;
                    }
                }


                //jesli ktores z tych pol to M

                if (parseInt(start.dataset.wys) - 1 > -1) {
                    if (Plansza.tab1[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] == 'M') {
                        warunekM = "true";
                        Plansza.tab2[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] = start.dataset.wys + "_" + start.dataset.szer;
                        Plansza.sciezka = Plansza.tab2[parseInt(start.dataset.wys) - 1][parseInt(start.dataset.szer)] + "," + (parseInt(start.dataset.wys) - 1).toString() + "_" + start.dataset.szer;
                    }
                }
                if (parseInt(start.dataset.szer) + 1 < 9) {
                    if (Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] == 'M') {
                        warunekM = "true";
                        Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] = start.dataset.wys + "_" + start.dataset.szer;
                        Plansza.sciezka = Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) + 1] + "," + start.dataset.wys + "_" + (parseInt(start.dataset.szer) + 1).toString();
                    }
                }

                if (parseInt(start.dataset.wys) + 1 < 9) {
                    if (Plansza.tab1[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] == 'M') {
                        warunekM = "true";
                        Plansza.tab2[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] = start.dataset.wys + "_" + start.dataset.szer;
                        Plansza.sciezka = Plansza.tab2[parseInt(start.dataset.wys) + 1][parseInt(start.dataset.szer)] + "," + (parseInt(start.dataset.wys) + 1).toString() + "_" + start.dataset.szer;
                    }
                }

                if (parseInt(start.dataset.szer) - 1 > -1) {
                    if (Plansza.tab1[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] == 'M') {
                        warunekM = "true";
                        Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] = start.dataset.wys + "_" + start.dataset.szer;
                        Plansza.sciezka = Plansza.tab2[parseInt(start.dataset.wys)][parseInt(start.dataset.szer) - 1] + "," + start.dataset.wys + "_" + (parseInt(start.dataset.szer) - 1).toString();;
                    }
                }

                for (var i = 1; i < 30; i++) {
                    if (warunekM != "false") {
                        break;
                    }

                    for (let k = 0; k < 9; k++) {
                        for (let l = 0; l < 9; l++) {
                            if (Plansza.tab1[k][l] == i.toString()) {

                                //jesli pole nad jest 0
                                if (k - 1 > -1) {
                                    if (Plansza.tab1[k - 1][l] == '0') {
                                        Plansza.tab1[k - 1][l] = (i + 1).toString()
                                        Plansza.tab2[k - 1][l] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                    }
                                }
                                //jesli pole z prawej jest 0
                                if (l + 1 < 9) {
                                    if (Plansza.tab1[k][l + 1] == '0') {
                                        Plansza.tab1[k][l + 1] = (i + 1).toString()
                                        Plansza.tab2[k][l + 1] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                    }
                                }
                                //jesli pole pod jest 0
                                if (k + 1 < 9) {
                                    if (Plansza.tab1[k + 1][l] == '0') {
                                        Plansza.tab1[k + 1][l] = (i + 1).toString()
                                        Plansza.tab2[k + 1][l] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                    }
                                }

                                //jesli pole z lewej jest 0
                                if (l - 1 > -1) {
                                    if (Plansza.tab1[k][l - 1] == '0') {
                                        Plansza.tab1[k][l - 1] = (i + 1).toString()
                                        Plansza.tab2[k][l - 1] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                    }
                                }


                                //jesli ktores z tych pol to M

                                if (l + 1 < 9) {
                                    if (Plansza.tab1[k][l + 1] == 'M') {
                                        warunekM = "true";
                                        Plansza.tab2[k][l + 1] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                        Plansza.sciezka = Plansza.tab2[k][l + 1] + "," + k + "_" + (l + 1).toString();
                                    }
                                }

                                if (l - 1 > -1) {
                                    if (Plansza.tab1[k][l - 1] == 'M') {
                                        warunekM = "true";
                                        Plansza.tab2[k][l - 1] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                        Plansza.sciezka = Plansza.tab2[k][l - 1] + "," + k + "_" + (l - 1).toString();
                                    }
                                }

                                if (k - 1 > -1) {
                                    if (Plansza.tab1[k - 1][l] == 'M') {
                                        warunekM = "true";
                                        Plansza.tab2[k - 1][l] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                        Plansza.sciezka = Plansza.tab2[k - 1][l] + "," + (k - 1).toString() + "_" + l;
                                    }
                                }

                                if (k + 1 < 9) {
                                    if (Plansza.tab1[k + 1][l] == 'M') {
                                        warunekM = "true";
                                        Plansza.tab2[k + 1][l] = Plansza.tab2[k][l] + "," + k + "_" + l;
                                        Plansza.sciezka = Plansza.tab2[k + 1][l] + "," + (k + 1).toString() + "_" + l;
                                    }
                                }



                            }
                        }
                    }

                }

                Plansza.tabsciezki = Plansza.sciezka.split(',')

                if (Plansza.sciezka == "0") {
                    Plansza.CzyPrzes = "NIE";
                }
                else {
                    Plansza.CzyPrzes = "TAK";
                }

                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        Plansza.TAB2[i][j].style.backgroundColor = "white";
                    }
                }


                for (var z = 1; z < Plansza.tabsciezki.length; z++) {
                    for (var i = 0; i < 9; i++) {
                        for (var j = 0; j < 9; j++) {
                            if (Plansza.TAB2[i][j].id == Plansza.tabsciezki[z]) {
                                Plansza.TAB2[i][j].style.backgroundColor = "#B22222";
                            }
                        }
                    }

                }

            }

        }
    }

    /**
*  Moves the ball to the target field
* @param e The place on the board
*/
    Przesun(e: any): void {
        var pole = e.currentTarget;
        if (Plansza.warunek == 'true' && Plansza.CzyPrzes == "TAK" && Plansza.tabsciezki[Plansza.tabsciezki.length - 1] == pole.id) {
            var interwal = setInterval(RuchKulki, 50);
            var licznik = 1;
            var dane = Plansza.tabsciezki[0];
            var obciete = dane.split("_")
            var cyfra = Plansza.TAB[parseInt(obciete[0])][parseInt(obciete[1])]
            function RuchKulki(): void {
                var dane = Plansza.tabsciezki[licznik - 1];
                var obciete = dane.split("_")
                var dane1 = Plansza.tabsciezki[licznik];
                var obciete1 = dane1.split("_")
                Plansza.TAB[parseInt(obciete1[0])][parseInt(obciete1[1])] = cyfra;
                Plansza.TAB[parseInt(obciete[0])][parseInt(obciete[1])] = '0';
                Plansza.obiekt.OdswiezPlansza(Plansza.tabela, Plansza.TAB, 1);
                Plansza.warunek = "false";
                if (licznik == Plansza.tabsciezki.length - 1) {
                    clearInterval(interwal);
                    var odp = Plansza.obiekt.Zbijanie()
                    if (odp == "nie") {
                        Plansza.obiekt.Wylosuj();
                    }
                    Plansza.obiekt.Runda(Plansza.TAB, 1)
                }

                licznik++;

            }
        }
    }

    /**
*  Removes the balls on the board
*/
    Zbijanie(): string {
        var licznikp: number;
        var licznikk: number;
        var X: Array<number>;
        var Y: Array<number>;
        var zmienna: string
        X = [0];
        Y = [0];
        licznikp = 0;
        licznikk = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (Plansza.TAB[i][j] == "0") {
                    licznikp++
                }
            }
        }

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (Plansza.TAB[i][j] != "0") {
                    zmienna = Plansza.TAB[i][j];

                    //sprawdzanie w dol
                    if ((i + 1) < 9 && (i + 2) < 9 && (i + 3) < 9 && (i + 4) < 9) {
                        if (Plansza.TAB[i + 1][j] == zmienna && Plansza.TAB[i + 2][j] == zmienna && Plansza.TAB[i + 3][j] == zmienna && Plansza.TAB[i + 4][j] == zmienna) {
                            for (var a = 0; a < 5; a++) {
                                X.push(i + a)
                                Y.push(j)
                            }
                        }
                    }

                    //sprawdzanie w prawo
                    if ((j + 1) < 9 && (j + 2) < 9 && (j + 3) < 9 && (j + 4) < 9) {
                        if (Plansza.TAB[i][j + 1] == zmienna && Plansza.TAB[i][j + 2] == zmienna && Plansza.TAB[i][j + 3] == zmienna && Plansza.TAB[i][j + 4] == zmienna) {
                            for (var a = 0; a < 5; a++) {
                                X.push(i)
                                Y.push(j + a)
                            }
                        }
                    }

                    //sprawdzanie w lewo dol
                    if ((i + 1) < 9 && (i + 2) < 9 && (i + 3) < 9 && (i + 4) < 9 && (j - 1) > -1 && (j - 2) > -1 && (j - 3) > -1 && (j - 4) > -1) {
                        if (Plansza.TAB[i + 1][j - 1] == zmienna && Plansza.TAB[i + 2][j - 2] == zmienna && Plansza.TAB[i + 3][j - 3] == zmienna && Plansza.TAB[i + 4][j - 4] == zmienna) {
                            for (var a = 0; a < 5; a++) {
                                X.push(i + a)
                                Y.push(j - a)
                            }
                        }
                    }

                    //sprawdzanie w prawo dol
                    if ((i + 1) < 9 && (i + 2) < 9 && (i + 3) < 9 && (i + 4) < 9 && (j + 1) < 9 && (j + 2) < 9 && (j + 3) < 9 && (j + 4) < 9) {
                        if (Plansza.TAB[i + 1][j + 1] == zmienna && Plansza.TAB[i + 2][j + 2] == zmienna && Plansza.TAB[i + 3][j + 3] == zmienna && Plansza.TAB[i + 4][j + 4] == zmienna) {
                            for (var a = 0; a < 5; a++) {
                                X.push(i + a)
                                Y.push(j + a)
                            }
                        }
                    }
                }
            }
        }

        for (var i = 1; i < X.length; i++) {
            Plansza.TAB[X[i]][Y[i]] = "0";

        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (Plansza.TAB[i][j] == "0") {
                    licznikk++
                }
            }
        }

        Plansza.punkty = Plansza.punkty + licznikk - licznikp;
        Plansza.punktyP.innerText = (Plansza.punkty).toString();

        if (X.length > 1) {
            return "tak";
        }
        else {
            return "nie";
        }
    }

    /**
  *  Displays the contents of an array
 */
    StanTablicy(): void {
        console.log(this.tablica)
    }

}