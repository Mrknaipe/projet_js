import * as R from "ramda";
import { tokenize, buildNgrams } from "./tokenizer.js";

/**
 * Extrait la clé d'état (préfixe) depuis un n-gramme.
 * @param {string[]} ngram
 * @returns {string}
 */
const extractPrefix = (ngram) => R.init(ngram).join(" ");

/**
 * Extrait le mot suivant (suffixe) depuis un n-gramme.
 * @param {string[]} ngram
 * @returns {string}
 */
const extractSuffix = R.last;

/**
 * Incrémente le compteur d'un successeur dans l'accumulateur.
 * @param {Object} acc
 * @param {string[]} ngram
 * @returns {Object}
 */
const countSuccessor = (acc, ngram) => {
  const prefix = extractPrefix(ngram);
  const suffix = extractSuffix(ngram);
  const current = R.pathOr(0, [prefix, suffix], acc);
  return R.assocPath([prefix, suffix], current + 1, acc);
};

/**
 * Convertit des comptages bruts en fréquences relatives (probabilités).
 * @param {Object<string, number>} counts
 * @returns {Object<string, number>}
 */
const toFrequencies = (counts) => {
  const total = R.sum(R.values(counts));
  return R.map(R.divide(R.__, total), counts);
};

/**
 * Construit le modèle de Markov à partir d'un corpus textuel.
 *
 * Le modèle est un dictionnaire { préfixe → { successeur → probabilité } }
 * basé sur des n-grammes de taille `order + 1`.
 *
 * @param {Object} options
 * @param {number} [options.order=2] - Ordre du modèle (longueur du contexte)
 * @param {string} options.corpus - Le texte d'entraînement
 * @returns {Object} Le modèle de Markov
 */
export const buildModel = ({ order = 2, corpus }) => {
  const tokens = tokenize(corpus);
  const ngrams = buildNgrams(order + 1, tokens);
  const rawCounts = R.reduce(countSuccessor, {}, ngrams);
  return R.map(toFrequencies, rawCounts);
};
