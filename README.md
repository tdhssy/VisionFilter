

<p align="center">
  <img src="./assets/VisionFilter-logo_with-text.png"/>
</p>



<p align="center">
  <img src="https://img.shields.io/badge/npm-v10.8.1-red.svg" alt=Npm">
  <img src="https://img.shields.io/badge/node-v20.14.0-green.svg" alt="NodeJs">
  <img src="https://img.shields.io/badge/electron-v31.3.1-lightblue.svg" alt="Electron">
  <img src="https://img.shields.io/badge/socket.io-v4.7.5-orange.svg" alt="Socket.IO">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-AGPLv3-blue.svg" alt="License AGPLv3">
</p>


##

## **VisionFilter** est un logiciel permettant d'appliquer des filtres à des fenêtres spécifiques sur votre écran. Il utilise une connexion WebSocket pour recevoir des commandes d'un serveur afin de choisir un filtre.



# :memo: Commandes

```alt+num0``` : Fermer la fenêtre de capture.

```alt+num1``` : Désactiver/Activer le mode toujours premier plan.

# :mag_right: Fonctionnalités

- **Connexion WebSocket** : Connectez-vous à un serveur WebSocket pour recevoir des commandes concernant les filtres à appliquer et leur durée.
- **Réglage des FPS** : Configurez les images par seconde (FPS) pour la capture d'écran.
- **Sélection de fenêtre** : Choisissez la fenêtre que vous souhaitez capturer sans interrompre l'interaction avec celle-ci.
- **Filtres pré-enregistrés** : Une dizaine de filtre sont déjà prédéfini dans l'application (utilisable seulement via commande du serveur).
- **Test de serveur** : Vérifiez la disponibilité du serveur pour recevoir des requêtes grâce à un système de ping.
- **Fenêtre de prévisualisation** : Visualisez la fenêtre à capturer en temps réel grâce à une fenêtre de prévisualisation intégrée.


# :gear: Pile technologique

**Client:** Electron, socket.io-client

# :cd: Lancement local

Clonez le dépôt :

```bash
   git clone https://github.com/tdhssy/VisionFilter_Personnal.git
```

Accédez au répertoire du projet :

```bash
   cd VisionFilter
```

Installez les dépendances :

```bash
  npm install
```

Démarrer l'application

```bash
  npm start
```



# :warning: Problèmes Connus

## 1. **Problème de changement de fenêtre lors de la capture**

**Symptôme :**
Problème lors de changements du mode "toujours en premier plan".
Le raccourcis alt+tab ne fonctionne pas pour revenir sur la fenêtre.

**Solutions :**
1. **Barre des taches** : Cliquer directement sur l'application depuis la barre des taches afin de reprendre le focus de la fenêtres.

2. **Relancer une nouvelle capture** : Fermer la fenêtre et relancer une nouvelle capture.



## 2. **Problèmes de décalage de la souris lors de la capture**

**Symptôme :**
Problème lors du lancement de la capture la souris peut être décalée par rapport à la souris originals.

**Solution :**
1. **Barre des taches** : Activer l'option afin de cacher la barre des taches.


# :technologist: Auteur

- [@tdhssy](https://github.com/tdhssy)

# :ledger: License
Ce logiciel est sous licence
[AGPL License](https://choosealicense.com/licenses/agpl-3.0/)
