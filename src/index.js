/**
 * Modèle de Markov pour la prédiction de saisie au clavier
 * @module markov-text-predictor
 */

export { buildModel } from "./markov/model.js";
export { predict, topPredictions } from "./markov/predictor.js";
export { tokenize, normalize } from "./markov/tokenizer.js";
