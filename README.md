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

Dans le fichier `app/(tabs)/create.tsx`, modifiez l'adresse IP dans la méthode `uploadFile` et remplacez-la par l'adresse IPv4 de votre machine.

## 4. Installer les modules Python nécessaires

Installez les modules Python suivants :

```bash
pip install docx2pdf pptxtopdf odt_pdf openai
```

## 5. Lancer le serveur Backend

Dans le répertoire `backend`, démarrez le serveur avec la commande suivante :

```bash
node server.js
```

## 6. Lancer le Front-end

Retournez dans le répertoire principal du projet et lancez l'application front-end avec la commande suivante :

```bash
npm start
```

## 7. Installer Expo Go sur votre appareil mobile

- Téléchargez l'application **Expo Go**.
- Scannez le QR code affiché dans votre terminal ou votre navigateur.
- Attendez que le build de l'application soit terminé.
- Connectez-vous avec les identifiants suivants ou créer un compte :
  - **Email :** `a`
  - **Mot de passe :** `a`

---

