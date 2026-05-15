# Markov Text Predictor

Modèle de Markov d'ordre _n_ appliqué aux textes pour la **prédiction de saisie au clavier**.

Projet réalisé en JavaScript fonctionnel avec [Ramda](https://ramdajs.com/).

---

## Concept

Un modèle de Markov d'ordre `n` apprend les probabilités de transition entre séquences de mots (_n-grammes_). Pour un contexte de `n` mots, il prédit les successeurs les plus probables — le principe de base d'une prédiction de saisie.

```
"le chat" → "mange" (40%), "dort" (35%), "joue" (25%)
```

---

## Architecture

```
src/
├── index.js               # Point d'entrée / exports publics
├── demo.js                # Exemple d'utilisation
└── markov/
    ├── tokenizer.js       # Normalisation et construction des n-grammes
    ├── model.js           # Construction du modèle (comptages → probabilités)
    └── predictor.js       # Prédiction, tirage stochastique, génération
```

---

## Notions Ramda utilisées

| Fonction | Usage |
|---|---|
| `R.pipe` | Composition de transformations (tokenisation, tri) |
| `R.curry` | Fonctions partiellement applicables (`predict`, `topPredictions`) |
| `R.reduce` | Accumulation des comptages de n-grammes |
| `R.map` | Transformation des comptages en probabilités |
| `R.aperture` | Construction des n-grammes consécutifs |
| `R.sortWith` / `R.descend` | Tri des prédictions par probabilité |
| `R.toPairs` / `R.last` | Navigation dans les structures |
| `R.pathOr` / `R.assocPath` | Mise à jour immutable du modèle |
| `R.reject` / `R.isEmpty` | Filtrage des tokens vides |
| `R.times` | Répétition fonctionnelle pour la génération |

---

## Installation

```bash
npm install
```

## Utilisation

```bash
# Lancer la démonstration
npm run demo

# Lint
npm run lint

# Format
npm run format
```

## API

```js
import { buildModel, predict, topPredictions } from "./src/index.js";

const model = buildModel({ order: 2, corpus: "votre texte ici..." });

// Toutes les prédictions triées
const all = predict(model, "le chat");

// Les 3 meilleures suggestions
const top3 = topPredictions(model, 3, "le chat");
// → [{ word: "mange", probability: 0.4 }, ...]
```

---

