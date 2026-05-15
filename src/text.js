import * as R from 'ramda';

export const couperMots = R.pipe( // coupe le texte en plusieurs mot
  R.toLower,
  R.split(/\s+/),
  R.reject(R.isEmpty), // élimine quand il y a deux espaces consécutifs
);

export const couperCaracteres = R.pipe( // couper mot en plusieurs caractères
  R.toLower,
  R.split(''),
);

export const nettoyerLettres = R.filter( // enleve les caracteres spéciaux (virgule,point,apostrophes...)
  R.test(/[a-zàâäéèêëîïôöùûüç ]/),
);

export const couperNettoyerTout = R.pipe(
  couperCaracteres,
  nettoyerLettres,
);

export const listeMot = R.pipe( // crée une liste avec tout les mots unique
  couperMots,
  R.uniq,
);


