/**
 * Correction du TP jeu du pendu
 * @author : Antoine
 */
import { EventEmitter } from 'events';
import { MockWords} from "../data";
import { Game, Status } from "../game";

/**
 * Bootstrap
 */
let event: EventEmitter = new EventEmitter(); // Nous permet d'interargir avec la console
process.stdin.setEncoding('utf8'); // définit l'encodage des caractères dans le flux de la console
// récupère le nom à émettre pour continuer à demander une nouvelle lettre
let current: any; // on met cette variable any, mais dans le jeu elle vaut choice 
let game = new Game(MockWords); // on passe les mots à l'objet Game pour initialiser le jeu

/**
 * Application : interaction avec la console 
 */

// méthode permettant de préparer les données récupérées dans le flux du terminal
process.stdin.on('data', (data) => {
  event.emit(current, data.toString().trim());
});

// On repasse par connect systématiquement
event.on('connect', (choice, question) => {
  console.log(question);
  current = choice;
  process.stdout.write('> ');
});

// Les paramètres 2 et 3 sont récupérés par la méthode event.on('connect', ...)
event.emit('connect', 'choice', game.message);

event.on('choice', (choice) => {
  // TODO
});

/**
 * Une fois que l'on arrive ici on fait le bilan du jeu 
 */
event.on('end', () => {
  // TODO
  process.stdin.pause();
});
