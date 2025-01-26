# Guide d'installation du projet

Ce guide décrit les étapes nécessaires pour installer et démarrer le projet sur votre machine.

## 1. Cloner le dépôt Git

Clonez le dépôt en utilisant la commande suivante :

```bash
git clone https://github.com/qwex03/revismmi.git
```

## 2. Installer les modules npm

Naviguez dans le répertoire du projet et installez les dépendances npm :

```bash
npm install
```

## 3. Modifier l'IP dans le fichier `create.tsx`

Dans le fichier `app/(tabs)/create.tsx`, modifiez l'adresse IP dans la méthode `uploadFile` à la ligne 69 et remplacez-la par l'adresse IPv4 de votre machine.

## 4. Rajouter la clé API Open AI (fournie par mail)

Il y a 2 fichiers dans le dossier `backend` à remplir avec la clé :

Dans le fichier analyzeImage.py à la ligne 6.
Dans le fichier create_course.js à la ligne 7.

## 5. Installer les modules Python nécessaires

La version de python utilisée est 3.11.4

Installez les modules Python :

```bash
pip install -r requirements.txt
```

## 6. Lancer le serveur Backend

Dans le répertoire `backend`, démarrez le serveur avec la commande suivante :

```bash
node server.js
```

## 7. Lancer le Front-end

Veillez à ce que votre smartphone et votre ordinateur soient connectés au même réseau.

Retournez dans le répertoire principal du projet et lancez l'application front-end avec la commande suivante :

```bash
npm start
```

## 8. Installer Expo Go sur votre appareil mobile

- Téléchargez l'application **Expo Go**.
- Vous n'avez pas besoin de créer de compte.
- Scannez le QR code affiché dans votre terminal lors du lancement de l'app dans l'étape précédente.
- Attendez que le build de l'application soit terminé.
- Connectez-vous avec les identifiants suivants ou créer un compte :
  - **Email :** `a`
  - **Mot de passe :** `a`

---

