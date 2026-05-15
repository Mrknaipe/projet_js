console.log('Projet JS initialise avec Biome et Docker.');


import { CORPUS } from './corpus.js';
import { couperMots, couperNettoyerTout, listeMot } from './text.js';

console.log('couperMots :');
console.log(couperMots(CORPUS));

console.log('couperNettoyerTout :');
console.log(couperNettoyerTout(CORPUS));

console.log('listeMot : ');
console.log(listeMot(CORPUS));
