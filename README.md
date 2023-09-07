I dette sporet vil du få se hvordan man kan spesifisere et systems oppførsel i scenario-format, og basert på dette bruke Cucumber til å implementere automatiserte tester og levende dokumentasjon.

Du vil også få se noen eksempler på hvordan WireMock kan brukes både til å redusere avhengigheter og gi mer stabile tester, og for å enklere teste spesialtilfeller og feilscenarier.

# Beskrivelse

https://developer.yr.no/doc/GettingStarted/

## System under test (SUT)

* Applikasjonsserver med HTTP REST-grensesnitt (TypeScript og NodeJS)
* Overordnet funksjonalitet:
    * Hente dagens værmelding fra yr for navngitte lokasjoner
    * Legge til og fjerne lokasjoner
    * Hente værmelding for en navngitt lokasjon
    * Ingen persistering/permanent lagring
* API-endepunkter:
    * /health (GET)
    * /locations (GET/POST)
        * Se nedenfor
    * /locations/:id (GET/PUT/DELETE)
        * `{ name: string, lat: float, lon: float }`
    * /weather/:locationId (GET)
        * Returnerer JSON-respons fra yr.no for lokasjon med lagrede koordinater

## Cucumber-tester
* Legg til ugyldig posisjon
* Fjern lokasjon som ikke finnes
* Hent vær for ugyldig lokasjon
* Hent vær for gyldig lokasjon
* Feilhåndtering - feilkoder fra yr.no

## WireMock
* Mocke korrekt respons fra yr.no
* Mocke feilrespons fra yr.no


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
