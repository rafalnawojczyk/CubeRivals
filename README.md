# Cube Rivals Mobile App

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Setup](#setup)

## General info

...

## Technologies

Project is created with:

-   [Expo](https://expo.dev/) Framework built around React Native library. Gives easy access to native functions and is making development really stress-free.
-   [React](https://reactjs.org/) UI development library, build with creating reactive apps in Javascript
-   [Typescript](https://reactjs.org/) Javascript superset, which add static typing to Javascript
-   [Realm](https://realm.io/) Realm is a fast, scalable alternative to SQLite with mobile to cloud data sync that makes building real-time, reactive mobile apps easy.

## Setup

Clone this repo to your desktop and run this command to install all the dependencies:

```
npm install
```

In the meantime you can rename file named:

```
.env.example
```

to/or create file named

```
.env
```

which will contain all environmental variables. In file you need to include these variables:

```
REALM_APP_ID=<ID OF REALM APP FROM ATLAS DASHBOARD>
```

To get Realm App Id:

1. Create free account on [MongoDB](https://www.mongodb.com/)
2. Create free M0 cluster.
3. Click on App Services in upper navigation tab
4. Pick "Real Time Sync" template to create app
5. App ID should be in App Settings available from left panel

This app can run only as a standalone apk. It wont work through Expo Go. You need to build apk physically on devise, as it uses Realm(local database), and it needs to allocate space in mobile. To run apk use:

```
npx expo run:android
```

or

```
npx expo run:ios
```

To run Android - remember to install Android Studio and open a Virtual Device.

To run on iOS - prepare Virtual Device through xCode.
