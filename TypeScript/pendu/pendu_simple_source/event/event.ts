import { EventEmitter } from 'events';

let event: EventEmitter = new EventEmitter(); 
let current : any ;

process.stdin.on('data', (data) => {
    // permet de récupérer la variable current qui sera ré-émis
    event.emit(current, data.toString().trim());
  });

event.on('connect', (message) => {
    console.log(message); // affichera Hello World
    current = 'response';
    process.stdout.write('> ');
});

// transmet la chaîne de caractères à event.on('connect' ,...)
event.emit('connect', 'Hello World !'); 

event.on('response', (response)=> {
    console.log(`Voici votre réponse : ${response}`);

    process.stdin.pause(); // termine le flux, en clair on ne peut plus rien taper en console
});
