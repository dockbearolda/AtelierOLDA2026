# Structure des Images - Atelier OLDA

## Organisation des dossiers

Les images sont organisées par collection dans des sous-dossiers :

```
/public/images/
├── bagues/           # Bagues et anneaux
├── bracelets/        # Bracelets
├── colliers/         # Colliers
├── boucles-oreilles/ # Boucles d'oreilles
├── tasses/           # Tasses céramique (ancien: mugs/)
├── tshirts/          # T-shirts
├── nouveautes/       # Nouveautés
├── promotions/       # Offres promotionnelles
└── mugs/            # Dossier legacy (à migrer)
```

## Format des fichiers

**Format recommandé : WebP**
- Meilleure compression
- Qualité préservée
- Chargement plus rapide

## Naming convention

Format : `[collection]-[ref]-[couleur].webp`

Exemples :
- `bagues-B001-or.webp`
- `tasses-TC01-rose-blanc.webp`
- `colliers-C003-argent.webp`

## Migration depuis /mugs/

Pour migrer les anciennes images :
1. Convertir les fichiers en .webp
2. Déplacer vers le bon dossier de collection
3. Mettre à jour les références dans MUGS_DATA (pages/index.js)

## Notes techniques

- Résolution recommandée : 800x800px minimum
- Fond blanc pur (#FFFFFF) de préférence
- Compression WebP : qualité 85-90%
