# Joe Laurier Production — Website

Site web officiel de **Joe Laurier Production** — producteur de beats trap & hip-hop basé à Montréal.

---

## Structure du projet

```
jlp-website/
├── index.html          → Version française (racine)
├── en/
│   └── index.html      → Version anglaise
├── css/
│   └── style.css       → Tous les styles
├── js/
│   └── main.js         → Logique JS (beats, player, form, filtres)
├── assets/
│   └── Logo.png        → Logo JLP
└── beats/
    ├── Back to Back/   → Cover + fichier audio
    ├── Hitman/
    ├── Keep On Running/
    ├── Like I Do/
    ├── Like That/
    ├── On My Wave/
    ├── Sitll Blazing/
    └── Weekend/
```

---

## Mise en ligne — GitHub Pages

1. Crée un dépôt GitHub (ex: `jlp-website`)
2. Upload tous les fichiers dans ce repo
3. Va dans **Settings → Pages**
4. Source : `Deploy from a branch` → branche `main` → dossier `/ (root)`
5. Clique **Save** — le site sera disponible à `https://ton-username.github.io/jlp-website/`

---

## Ajouter un beat

1. Crée un dossier dans `beats/` avec le nom du beat (ex: `beats/Midnight/`)
2. Mets le fichier audio dans ce dossier (MP3 recommandé pour le web, WAV accepté)
3. Mets la cover image dans le même dossier (PNG ou JPG, carré idéalement)
4. Ouvre `js/main.js` et ajoute un objet dans le tableau `beats` :

```js
{
  id: 9,                           // Numéro unique (prendre le suivant)
  name: "Midnight",                // Nom du beat (affiché sur le site)
  bpm: 135,                        // BPM
  scale: "F Minor",                // Tonalité
  genre: "Trap",                   // Trap | Hip-Hop | Drill
  price: 29.99,                    // Prix en $ (0 = "GRATUIT")
  file: "beats/Midnight/midnight.mp3",          // Chemin vers l'audio
  cover: "beats/Midnight/midnight-cover.jpg",   // Chemin vers la cover
  beatstarsUrl: "https://www.beatstars.com/joelaurierproduction"
},
```

---

## Mettre à jour les vidéos YouTube

Ouvre `js/main.js` et modifie le tableau `videos` :

```js
const videos = [
  {
    title: "Back to Back | Trap Beat",
    youtubeId: "dQw4w9WgXcQ",   // ← L'ID dans l'URL youtube.com/watch?v=CECI
    views: "12.4K vues"
  },
  // ...
];
```

L'ID YouTube se trouve dans l'URL de la vidéo :
`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** ← copie seulement cette partie.

---

## Configurer le formulaire (Formspree)

1. Crée un compte sur [formspree.io](https://formspree.io)
2. Clique **New Form** → donne-lui un nom
3. Copie l'ID du formulaire (format : `xpzvkwqb`)
4. Dans **`index.html`** (ligne ~160) et **`en/index.html`** (ligne ~160), remplace :
   ```html
   action="https://formspree.io/f/METTRE_TON_ID"
   ```
   par :
   ```html
   action="https://formspree.io/f/xpzvkwqb"
   ```
5. Les soumissions arriveront dans ton dashboard Formspree et par email

---

## Changer les liens réseaux sociaux

Dans `index.html` et `en/index.html`, cherche et remplace :

| Plateforme | Variable à changer |
|---|---|
| YouTube | `https://www.youtube.com/@joelaurierproduction` |
| BeatStars | `https://www.beatstars.com/joelaurierproduction` |
| Instagram | `https://www.instagram.com/joelaurierproduction` |

---

## Ajouter ta photo (section À propos)

1. Mets ta photo dans `assets/images/joe-laurier.jpg`
2. Dans `index.html`, trouve le commentaire `<!-- Pour ajouter ta photo -->` et remplace le div placeholder par :
   ```html
   <img src="assets/images/joe-laurier.jpg" alt="Joe Laurier">
   ```
3. Dans `en/index.html`, même chose mais avec le chemin `../assets/images/joe-laurier.jpg`

---

## Modifier les prix

Dans `js/main.js`, chaque beat a un champ `price`.
- `price: 29.99` → affiche `$29.99`
- `price: 0` → affiche `GRATUIT`

---

## Note sur les fichiers WAV

Les fichiers WAV sont volumineux (50–200 MB chacun). GitHub Pages a une limite de 100 MB par fichier.
**Recommandation** : convertis tes beats en MP3 320kbps pour le site web. L'original WAV reste pour le mix.

Pour convertir rapidement :
- [CloudConvert](https://cloudconvert.com/wav-to-mp3) (en ligne, gratuit)
- Audacity (gratuit, local)
- ffmpeg : `ffmpeg -i beat.wav -b:a 320k beat.mp3`

---

## Contacts & Support

- BeatStars : [beatstars.com/joelaurierproduction](https://www.beatstars.com/joelaurierproduction)
- YouTube : [youtube.com/@joelaurierproduction](https://www.youtube.com/@joelaurierproduction)

---

*Site construit en HTML/CSS/JS vanilla — aucune dépendance, aucun framework.*
