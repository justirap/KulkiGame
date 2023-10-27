import Plansza from './Klasy/Plansza';

const plansza: Plansza = new Plansza("plansza");


var tablica = [['0']];

let podglad: any;
podglad = document.getElementById("podglad");
let obrot: any;
obrot = document.getElementById("obrot");
let tab: any;
tab = document.getElementById("tab");
let div: any;
div = document.getElementById("main");
let p: any;
p = document.getElementById("punkty");
tablica = plansza.PustaPlansza(tab, tablica, plansza, podglad, obrot, p);
plansza.Wylosuj();
plansza.Runda(tablica, 0);




