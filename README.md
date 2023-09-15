I dette sporet vil du få se hvordan man kan spesifisere et systems oppførsel i scenario-format, og basert på dette bruke Cucumber til å implementere automatiserte tester og levende dokumentasjon.

Du vil også få se noen eksempler på hvordan WireMock kan brukes både til å redusere avhengigheter og gi mer stabile tester, og for å enklere teste spesialtilfeller og feilscenarier.

# Beskrivelse

https://developer.yr.no/doc/GettingStarted/

## System under test (SUT)

* Applikasjonsserver med HTTP REST-grensesnitt (TypeScript, NodeJS, Express)
* Overordnet funksjonalitet:
    * Hente værmelding fra yr.no (met.no) for en navngitt lokasjon
    * Legge til og fjerne lokasjoner
    * Ingen persistering/permanent lagring
* API-endepunkter:
    * `GET /health` - Returner status OK så lenge applikasjonen er oppe
    * `GET /health/yr` - Hent status fra yr.no og returner OK hvis svar
    * `GET /locations` - List ut registrerte lokasjoner
    * `POST /locations` - Legg til en ny lokasjon
        * Format: `{ name: string, coordinates: { lat: float, lon: float } }`
    * `GET /locations/:name` - Hent en registrert lokasjon
    * `DELETE /locations/:name` - Slett en registrert lokasjon
    * `GET /weather/:locationName` - Hent en enkel værmelding for en registrert lokasjon

## Cucumber-tester
* Legg til ugyldig posisjon
* Fjern lokasjon som ikke finnes
* Hent vær for ugyldig lokasjon
* Hent vær for gyldig lokasjon
* Feilhåndtering - feilkoder fra yr.no

## WireMock
* Mocke korrekt respons fra yr.no
* Mocke feilrespons fra yr.no
* HTTPS -- må håndtere self-signed sertifikat..


# Kom i gang

## 1. Forutsetninger / avhengigheter
### NPM / Node.js
* Anbefaler å bruke [NVM](https://github.com/nvm-sh/nvm) til å installere og håndtere Node-versjoner
* Koden er utviklet og testet med Node v20.4 (spesifisert i `.nvmrc`)

#### 0. Installere NVM

Følg instruksjoner på [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
#### 1. Sett riktig node-versjon
Naviger inn i mappen med repoet og kjør følgende kommando for å installere Node-versjon fra `.nvmrc`:
```
nvm install
```
Når riktig versjon er installert, kan man deretter velge gjør denne aktiv med kommandoen:
```
nvm use
```

## 2. System under test (SUT)
### 0. Naviger til riktig mappe
```
cd sut
```
### 1. Installer nødvendige pakker
```
npm install
```
### 2. Bygg og start server

#### 2a) For å teste ut med reell integrasjon mot vær-API hos met.no/yr.no
```
npm run start
```

#### 2b) For å gjøre isolert systemtesting med lokal instans av WireMock
```
npm run test:local
```
#### 2c) For å gjøre isolert systemtesting med sky-instans av WireMock
```
npm run test:cloud
```

## 3. Cucumber-tester
### 0. Naviger til riktig mappe
```
cd cucumber
```
### 1. Start WireMock via Docker
```
docker-compose up -d
```
### 2. Kjør tester

#### 2a) Test med lokal instans av WireMock
```
npm run cucumber:local
```
#### 2b) Test med sky-instans av WireMock
```
npm run cucumber:cloud
```
