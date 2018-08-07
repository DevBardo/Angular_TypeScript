"use strict";
exports.__esModule = true;
var events_1 = require("events");
var event = new events_1.EventEmitter();
var current;
process.stdin.on('data', function (data) {
    // permet de récupérer la variable current qui sera ré-émis
    console.log('traitement des données, systématique');
    event.emit(current, data.toString().trim());
});
event.on('connect', function (message) {
    console.log(message); // affichera Hello World
    current = 'response';
    process.stdout.write('> ');
});
// transmet la chaîne de caractères à event.on('connect' ,...)
event.emit('connect', 'Hello World !');
event.on('response', function (response) {
    console.log("Voici votre r\u00E9ponse : " + response);
    process.stdin.pause(); // termine le flux, en clair on ne peut plus rien taper en console
});
