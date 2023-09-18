# Beskrivelse
Kode tilkyttet foredrag "Cucumber kombinert med WireMock" på Testdagen Odin 2023:

> I dette sporet vil du få se hvordan man kan spesifisere et systems oppførsel i scenario-format, og basert på dette bruke 
> Cucumber til å implementere automatiserte tester og levende dokumentasjon.
> Du vil også få se noen eksempler på hvordan WireMock kan brukes både til å redusere avhengigheter og gi mer stabile tester, og 
> for å enklere teste spesialtilfeller og feilscenarier.

## System under test (SUT): `/sut`

* Enkel, hjemmesnekret applikasjonsserver med HTTP REST-grensesnitt (TypeScript, NodeJS, Express)
* Overordnet funksjonalitet:
    * Hente værmelding fra Yr (met.no) for en navngitt lokasjon
    * Legge til og fjerne lokasjoner
    * Ingen persistering/permanent lagring
* API-endepunkter:
    * `GET /health` - Returner status OK så lenge applikasjonen er oppe
    * `GET /health/yr` - Gjør helsesjekk av Yr sitt API og returner en status
    * `GET /locations` - List ut registrerte lokasjoner
    * `POST /locations` - Legg til en ny lokasjon
        * Format: `{ name: string, coordinates: { lat: float, lon: float } }`
    * `GET /locations/:name` - Hent en registrert lokasjon
    * `DELETE /locations/:name` - Slett en registrert lokasjon
    * `GET /weather/:locationName` - Hent en enkel værmelding for en registrert lokasjon
* API-dokumentasjon fra Yr / met.no:
    * https://developer.yr.no/doc/GettingStarted/
    * https://api.met.no/weatherapi/locationforecast/2.0/documentation

## Cucumber-tester (TypeScript): `/cucumber`
* Implementert som black-box systemtester mot REST-grensesnitt på SUT (TypeScript, CucumberJS, WireMock)
* Noen utvalgte scenarier for de ulike API-endepunktene
* Kompliserende faktor: Mocking av endepunkter over HTTPS

## Cucumber-tester (Kotlin): `/cucumber-kotlin`
* Implementert som black-box systemtester mot REST-grensesnitt på SUT (Kotlin, Cucumber-JVM, REST Assured, WireMock)
* Ellers som over

# Kom i gang med koden

## 1. Forutsetninger / avhengigheter
### NPM / Node.js
Anbefaler å bruke [NVM](https://github.com/nvm-sh/nvm) til å installere og håndtere Node-versjoner.

Koden er utviklet og testet med Node v20.4 (spesifisert i `.nvmrc`).

#### Installér NVM
Følg instruksjoner på https://github.com/nvm-sh/nvm.

#### Sett riktig node-versjon
Naviger inn i mappen med repoet og kjør følgende kommando for å installere Node-versjon fra `.nvmrc`:
```
nvm install
```
Når riktig versjon er installert, kan man deretter velge gjør denne aktiv med kommandoen:
```
nvm use
```

### Docker
Følg instruksjoner på https://docs.docker.com/desktop/.

### Start WireMock
```
docker compose up -d
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

## 3. Cucumber-tester (TypeScript)
### 0. Naviger til riktig mappe
```
cd cucumber
```
### 1. Kjør tester
#### 1a) Test med lokal instans av WireMock
```
npm run cucumber:local
```
#### 1b) Test med sky-instans av WireMock
```
npm run cucumber:cloud
```

## 4. Cucumber-tester (Kotlin)
### 0. Naviger til riktig mappe
```
cd cucumber-kotlin
```
### 1. Kjør tester
#### 1a) Test med lokal instans av WireMock
```
./gradlew test
```

#### 1b) Test med sky-instans av WireMock
```
./gradlew test -Dwiremock.host=odin2023.wiremockapi.cloud -Dwiremock.port=443
```

# Oppgaver
## 1. Stegdefinisjon for helsesjekk
Scenarioet "Applikasjonen skal gi status ikke OK hvis Yr ikke svarer OK på status" i `health.feature` har en stegdefinisjon som ikke er implementert.

Finn og implementer dette steget.

## 2. Scenario og stegdefinisjon for feil ved henting av værmelding
Det finnes allerede et par scenarier for henting av værmelding for en gitt lokasjon, men dekningen er ikke god og bør utvides.

Deloppgaver:
1. Formulér et scenario der henting av værmelding fra Yr feiler
2. Implementer eventuelle manglende stegdefinisjoner

## 3. Scenarioer og stegdefinisjoner for ulike værtyper tjenesten kan returnere
SUT returnerer tre ulike forenklede værmeldinger basert på værdataene som returneres fra met.no/yr.no.

Deloppgaver:
1. Formulér scenarier som dekker denne funksjonaliteten
2. Implementer stegdefinisjoner med eventuelle mockdata nødvendig for automatisert, black-box systemtesting av dette

Tips: Se `./sut/src/models/weather.ts` for definisjoner på de tre ulike værtypene.
