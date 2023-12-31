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

## Entrepots et drones

Il y a un nombre de drones et d'entrepots donnés dans les 2 fichiers JSON. Il est possible d'en rajouter pour avoir plus d'entrepots et de drones circulants sur la carte, mais comme ces données sont stockées dans le localStorage, il ne faut pas oublier de les supprimer avant d'actualiser la page pour prendre en compte ces nouvelles données.

Il est possible de changer le nom d'un drone, le temps de son trajet, ses entrepots de départ et d'arrivée (ne mettre que la lettre de l'entrepot choisi) et si il est actif ou non.
Un drone qui n'est pas actif n'apparaîtra pas sur la liste des drones actifs que l'on peut voir sur la page Index avec la carte, son pin-point et sa ligne de trajet ne seront pas affichés non plus.


Le visuel est disponible ici : https://drone-livraison.netlify.app/


logo airDrone de Freepik