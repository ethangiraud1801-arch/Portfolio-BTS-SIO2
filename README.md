# Portfolio — Ethan GIRAUD

Site Astro statique en français, avec Open Props pour les fondations CSS et des composants CSS sur mesure.

## Lancer le site

```bash
npm install
npm run dev
```

Ouvrir l’adresse locale affichée par Astro. `npm run build` génère le site dans `dist/`; `npm run preview` permet de contrôler la version générée. `npm run check` vérifie les fichiers Astro et TypeScript.

## Modifier les contenus

- `src/data/site.ts` : nom, e-mail, profils professionnels, CV et **exactement six** projets. Modifier les textes provisoires dans ce fichier.
- `src/pages/index.astro` : introduction, accès de l’accueil et projet mis en avant. La carte actuelle reprend le titre et le résumé du projet ELK dans `src/data/site.ts` ; son visuel transparent est dans `public/images/elk-stack-transparent.png`.
- `src/pages/a-propos.astro` : présentation, formation et domaines suivis.
- `src/data/competences.ts` : catégories et compétences affichées sur la page Compétences. Les entrées actuelles proviennent des projets et expériences communiqués.
- `src/data/experience.ts` : expériences confirmées (organisation, rôle, période, description et missions). La page `src/pages/experience.astro` affiche une frise automatiquement dès que cette liste contient des entrées.
- `src/data/technoclic-tools.json` : noms des outils affichés dans la carte Technoclic et sur la page Compétences. Pour un ajout simple, communiquer le nom et éventuellement le fichier du logo ; il n’est pas nécessaire de modifier les pages.
- `src/data/analyses.ts` : futures analyses personnelles. Ajouter la page correspondante sous `src/pages/analyses/` et son URL dans la liste.

L’icône du site se modifie dans `src/components/Icon.astro` (`technician`) et dans `public/favicon.svg` pour l’onglet du navigateur. L’animation du visuel ELK est désactivée si la réduction des animations est demandée dans le système.

Laisser `email`, `linkedin`, `github` ou `cv` vides tant que les vrais renseignements ne sont pas disponibles. Le site affiche alors un état explicite sans lien inopérant. Les captures de référence ont servi à la direction visuelle uniquement : leurs entreprises, expériences et compétences ne sont pas reprises.

## Ajouter un outil ou un logo à Technoclic

La liste se trouve dans `src/data/technoclic-tools.json`. Chaque ligne contient un `name` et un `logo`. Pour afficher seulement le nom, laisser `logo` vide ; un monogramme est généré automatiquement. Pour afficher un logo, placer une image `.svg`, `.png` ou `.webp` dans `public/logos/`, puis renseigner par exemple `"logo": "/logos/ninjaone.svg"`. Le nom reste visible à côté de l’image. Les logos ne sont pas chargés depuis un service externe.

## Ajouter les PDF

Placer les fichiers dans `public/documents/`. Pour chaque projet dans `src/data/site.ts`, renseigner `pdf`, par exemple `/documents/projet-1.pdf`. Le lien « Télécharger la documentation PDF » apparaît automatiquement. Même principe pour `profile.cv`.

## Veille RSS

Ajouter ou retirer des objets `{ "name", "url", "category" }` dans `src/data/feed-sources.json`. Les deux sources initiales sont [CERT-FR](https://www.cert.ssi.gouv.fr/feed/) et [Cloudflare Blog](https://blog.cloudflare.com/rss/). Vérifier que toute nouvelle URL est un flux RSS ou Atom accessible publiquement.

`npm run veille:update` récupère les flux côté Node, écrit `src/data/feed-cache.json`, déduplique les URL, trie par date et limite le cache à 36 articles des 90 derniers jours. Les flux indisponibles sont consignés dans `errors` ; les articles précédents restent visibles jusqu’à expiration. Si aucun article n’est disponible, la page affiche un message adapté. Les résumés proviennent des flux et les liens mènent aux publications originales. Il n’y a aucun appel RSS dans le navigateur.

La page Veille montre d’abord 14 articles. Le contrôle « Voir plus » affiche tous les articles restants du cache, sans nouvelle requête réseau. La limite initiale se modifie dans `src/pages/veille.astro`.

Le workflow `.github/workflows/update-veille.yml` lance la collecte chaque jour à 06:18 UTC et enregistre le cache dans le dépôt. Il peut aussi être lancé manuellement dans GitHub Actions. Cela suppose un dépôt GitHub avec Actions activé et une autorisation d’écriture pour `GITHUB_TOKEN`. Un hébergeur qui redéploie à chaque commit affichera alors la nouvelle collecte. Sur un autre hébergement statique, planifier `npm run veille:update` avant la construction et le déploiement. Les tâches GitHub planifiées peuvent être retardées ; la collecte n’est donc pas du temps réel.

## Hébergement

Aucune cible d’hébergement n’était configurée dans le dépôt initial. Définir `SITE_URL` avec l’URL publique lors du build (par exemple `https://portfolio.example`) puis publier `dist/`. La veille reste compatible avec un hébergement entièrement statique tant que la tâche planifiée et un redéploiement sont configurés.
