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
let event: EventEmitter = new EventEmitter(); // Nous permet d'interargir avec la console
process.stdin.setEncoding('utf8'); // définit l'encodage des caractères dans le flux de la console
// récupère le nom à émettre pour continuer à demander une nouvelle lettre
let current: any; // on met cette variable any, mais dans le jeu elle vaut choice 
let game = new Game(MockWords, new User); // on passe les mots à l'objet Game pour initialiser le jeu

/**
 * Application : interaction avec la console 
 */

// méthode permettant de préparer les données récupérées dans le flux du terminal
process.stdin.on('data', (data) => {
  event.emit(current, data.toString().trim());
});

// On repasse par connect systématiquement
event.on('connect', (choice, question) => {
  // le jeu n'a pas commencé
  if (game.status as Status === Status.Start) {
    console.log('Commencez par donner votre pseudo :')
    current = 'start';
  } else {
    // Variable "choice" qui sera capturée 
    // 1) Par la méthode process.stdin.on('data') 
    // 2) Renvoyée par event.emitter(current, ...)
    console.log(question);
    current = choice;
  }

  process.stdout.write('> ');
});

// Les paramètres 2 et 3 sont récupérés par la méthode event.on('connect', ...)
event.emit('connect', 'choice', game.message);

event.on('choice', (choice) => {
  if (game.isAlreadyPlayWord(choice) === true) {
    event.emit('connect', 'choice', "Vous avez déjà essayer cette lettre recommencer !");
  } else {
    game.run(choice); // la méthode run calcule la logique du jeu
    if (game.status === Status.Progress)
      event.emit('connect', 'choice', game.message); // on repasse par event.on('connect', ...)
    else
      event.emit('end');
  }
});

event.on('start', (pseudo) => {
  // on set les informations pour le joueur
  game.user.name = pseudo;
  game.user.score = 7; // on décrémente le score si mauvais choix
  game.status = Status.Progress as Status;
  console.log(`Bienvenu dans le jeu ${game.user.name} \n`);
  event.emit('connect', 'choice', game.message); // on renvoie vers le jeu 
});

/**
 * Une fois que l'on arrive ici on fait le bilan du jeu 
 */
event.on('end', (state) => {
  console.log(game.final());
  console.log(`Voulez-vous recommencer le jeu, répondez par oui ou non ?`);
  current = 'restart'; // on traite le choix de l'utilisateur pour savoir si on stoppe le jeu ou on continue
  process.stdout.write('> ');
});

// Cette partie permet de réinitialiser le jeu
event.on('restart', (response) => {
  if (response.toLowerCase() === 'oui') {
    game.init(MockWords, Status.Progress); // réinitialisation du jeu dans l'objet de type Game
    console.log(game.message);
    current = 'choice';
    process.stdout.write('> ');
    // On traite ici les mauvaises réponses pour relancer la question
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