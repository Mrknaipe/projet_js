/**
 * Démonstration du modèle de Markov pour la prédiction de saisie.
 * Exécuter avec : npm run demo
 */

import { buildModel } from "./markov/model.js";
import { topPredictions, generateSequence } from "./markov/predictor.js";

const corpus = `
  le chat mange une souris le chien court dans le jardin
  le chat dort sur le canapé le chien mange dans son bol
  le jardin est beau le soleil brille dans le ciel bleu
  une belle journée dans le jardin avec le chat et le chien
  le chat joue dans le jardin le chien court après le chat
  une souris court dans le jardin le chat la regarde
`.trim();

console.log("=== Modèle de Markov — Prédiction de saisie ===\n");

const model = buildModel({ order: 2, corpus });

const testPrefixes = [
  "le chat",
  "le chien",
  "dans le",
  "le jardin",
];

for (const prefix of testPrefixes) {
  const predictions = topPredictions(model, 3, prefix);
  const formatted = predictions
    .map(({ word, probability }) => `"${word}" (${(probability * 100).toFixed(1)}%)`)
    .join(", ");
  console.log(`Après "${prefix}" → ${formatted || "aucune suggestion"}`);
}

console.log("\n=== Génération de séquence ===\n");

const generated = generateSequence(model, 2, "le chat", 10);
console.log(`Séquence générée : "${generated}"`);
