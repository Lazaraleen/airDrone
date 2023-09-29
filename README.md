# airDrone

Projet réalisé durant la Prairie à la Fabrique du Numérique.

Créer un site de simulation de livraisons par drones.
Il faut 2 pages:
    - le tableau de bord où une partie de la page affichera la liste des drônes et l'autre partie la carte où ils se déplacent
    - l'interface de gestion qui permettra de saisir de nouvelles livraisons.

## Utilisation de Leafletjs et Moving Marker

Pour l'utilisation des cartes, j'ai utilisé la librairie Javascript open-source Leaflet : https://leafletjs.com/

Les pin-points bleus symbolisent les entrepots et si on clique dessus, on a le nom de l'entrepot (actuellement, ils n'ont qu'une lettre pour le nom).
Afin de faire bouger mes pin-points (non bleu) symbolisants les drones, j'ai utilisé le plug-in Moving Marker se trouvant sur ce dépot github : https://github.com/ewoken/Leaflet.MovingMarker


N'utilisant pas d'API sur ce projet, mes entrepots et mes drones sont des fichiers JSON.
Pour modifier les données des drones, les données sont stockées sur le localStorage où elles peuvent être modifiées et utiliser les modifications sur les actualisations de pages.