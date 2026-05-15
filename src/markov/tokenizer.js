import * as R from "ramda";

/**
 * Normalise une chaîne en minuscules sans ponctuation superflue.
 * @param {string} text
 * @returns {string}
 */
export const normalize = R.pipe(
  R.toLower,
  R.replace(/[^a-zàâçéèêëîïôùûüæœ\s]/g, ""),
  R.trim,
);

/**
 * Découpe un texte normalisé en liste de tokens (mots).
 * @param {string} text
 * @returns {string[]}
 */
export const tokenize = R.pipe(
  normalize,
  R.split(/\s+/),
  R.reject(R.isEmpty),
);

/**
 * Construit toutes les n-grammes consécutives d'une séquence.
 * @param {number} n - Taille de la fenêtre
 * @param {string[]} tokens
 * @returns {string[][]}
 */
export const buildNgrams = R.curry((n, tokens) =>
  R.aperture(n, tokens),
);
