import * as R from "ramda";

/**
 * Renvoie les prédictions triées par probabilité décroissante pour un préfixe donné.
 * @param {Object} model - Le modèle de Markov
 * @param {string} prefix - Le contexte courant (mots séparés par des espaces)
 * @returns {Array<{ word: string, probability: number }>}
 */
export const predict = R.curry((model, prefix) => {
  const successors = R.propOr({}, prefix, model);
  return R.pipe(
    R.toPairs,
    R.map(([word, probability]) => ({ word, probability })),
    R.sortWith([R.descend(R.prop("probability"))]),
  )(successors);
});

/**
 * Renvoie les `n` meilleures prédictions pour un préfixe.
 * @param {Object} model
 * @param {number} n - Nombre de suggestions
 * @param {string} prefix
 * @returns {Array<{ word: string, probability: number }>}
 */
export const topPredictions = R.curry((model, n, prefix) =>
  R.take(n, predict(model, prefix)),
);

/**
 * Sélectionne un mot de manière stochastique selon les probabilités du modèle.
 * @param {Object} model
 * @param {string} prefix
 * @returns {string | null}
 */
export const sampleNext = (model, prefix) => {
  const successors = R.propOr({}, prefix, model);
  if (R.isEmpty(successors)) return null;

  const roll = Math.random();
  let cumulative = 0;

  for (const [word, prob] of R.toPairs(successors)) {
    cumulative += prob;
    if (roll <= cumulative) return word;
  }

  return R.last(R.keys(successors));
};

/**
 * Génère une séquence de `length` mots à partir d'un préfixe initial.
 * @param {Object} model
 * @param {number} order - Ordre du modèle (longueur du contexte)
 * @param {string} seed - Préfixe de départ
 * @param {number} length - Nombre de mots à générer
 * @returns {string}
 */
export const generateSequence = (model, order, seed, length) => {
  const seedTokens = seed.toLowerCase().trim().split(/\s+/);
  const generated = [...seedTokens];

  R.times(() => {
    const context = R.takeLast(order, generated).join(" ");
    const next = sampleNext(model, context);
    if (next) generated.push(next);
  }, length);

  return generated.join(" ");
};
