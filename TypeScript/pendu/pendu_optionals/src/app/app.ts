/**
 * Correction du TP jeu du pendu
 * @author : Antoine
 */
import { EventEmitter } from 'events';
import { MockWords, User } from "../data";
import { Game, Status } from "../game";

/**
 * Bootstrap
 */
let event: EventEmitter = new EventEmitter();
process.stdin.setEncoding('utf8');
let current: any;
let game = new Game(MockWords, new User);

/**
 * Application : interaction avec la console 
 */

process.stdin.on('data', (data) => {
  event.emit(current, data.toString().trim());
});

event.on('connect', (choice, question) => {
  // Status Start permet de définir l'état du jeu
  if (game.status as Status === Status.Start) {
    console.log('Commencez par donner votre pseudo :')
    current = 'start';
  } else {
    console.log(question);
    current = choice;
  }

  process.stdout.write('> ');
});

event.emit('connect', 'choice', game.message);

event.on('choice', (choice) => {
  if (game.isAlreadyPlayWord(choice) === true) {
    event.emit('connect', 'choice', "Vous avez déjà essayer cette lettre recommencer !");
  } else {
    game.run(choice);
    if (game.status === Status.Progress)
      event.emit('connect', 'choice', game.message);
    else
      event.emit('end');
  }
});

/**
 * Initialisation du joueur
 */
event.on('start', (pseudo) => {
  game.user.name = pseudo;
  game.user.score = 7; // on décrémente le score si mauvais choix
  game.status = Status.Progress as Status;
  console.log(`Bienvenu dans le jeu ${game.user.name} \n`);
  event.emit('connect', 'choice', game.message);
});

/**
 * Fin de la partie
 */
event.on('end', (state) => {
  console.log(game.final());
  console.log(`Voulez-vous recommencer le jeu, répondez par oui ou non ?`);
  current = 'restart';
  process.stdout.write('> ');
});

/**
 * Réinitialisation du jeu
 */
event.on('restart', (response) => {
  if (response.toLowerCase() === 'oui') {
    game.init(MockWords, Status.Progress);
    console.log(game.message);
    current = 'choice';
    process.stdout.write('> ');
  } else if (response.toLowerCase() !== 'non') {
    console.log(`Désolé mais je n'ai pas compris votre réponse, écrivez oui ou non, puis tapez sur la touche "Entrée"`);
    current = 'restart';
    process.stdout.write('> ');
  }
  else {
    console.log('Merci et à bientôt');
    process.stdin.pause();
  }
});