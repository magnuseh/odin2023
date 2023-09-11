# language: no

Egenskap: Hente, legge til og slette lokasjon

    Scenario: Hente en registrert lokasjon
        Gitt at jeg har registrert en lokasjon ved navn "Oslo"
        Når jeg henter informasjon om lokasjon "Oslo"
        Så skal applikasjonen returnere statuskode "200 OK"
    
    Scenario: Hente en ikke-registrert lokasjon
        Gitt at jeg ikke har registrert en lokasjon ved navn "Langtvekkistan"
        Når jeg henter informasjon om lokasjon "Langtvekkistan"
        Så skal applikasjonen returnere statuskode "404 Not Found"

    Scenario: Legge til en ny lokasjon
        Gitt at jeg ikke har registrert en lokasjon ved navn "Bergen"
        Når jeg registrerer en lokasjon ved navn "Bergen"
        Så skal applikasjonen returnere statuskode "200 OK"
        Og listen over registrerte lokasjoner skal inneholde "Bergen"


    Scenario: Legge til en allerede registrert lokasjon
        Gitt at jeg allerede har registrert en lokasjon ved navn "Oslo"
        Når jeg registrerer enda en lokasjon ved navn "Oslo"
        Så skal applikasjonen returnere statuskode "403 Conflict"

    Scenario: Slette en registrert lokasjon
        Gitt at jeg har registrert en lokasjon ved navn "Oslo"
        Når jeg sletter lokasjon "Oslo"
        Så skal applikasjonen returnere statuskode "200 OK"
        Og listen over registrerte lokasjoner skal ikke inneholde "Oslo"

    Scenario: Slette en ikke-registert lokasjon
        Gitt at jeg ikke har registrert en lokasjon ved navn "Bergen"
        Når jeg forsøker å slette lokasjon "Bergen"
        Så skal applikasjonen returnere statuskode "404 Not Found"
