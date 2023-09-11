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

## System under test (SUT)
0. Naviger til riktig mappe
```
cd sut
```
1. Installer nødvendige pakker
```
npm install
```
2. Bygg og start server
```
npm run start
```
