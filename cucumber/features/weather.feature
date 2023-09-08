# language: no

Egenskap: Hente værmelding

    Scenario: Hente værmelding for en registrert lokasjon
        Gitt at jeg har registrert en lokasjon ved navn "Oslo"
        Når jeg henter værmelding for "Oslo"
        Så skal applikasjonen returnere statuskode "200 OK"
    
    Scenario: Hente værmelding for en ikke-definert lokasjon
        Gitt at jeg ikke har registrert en lokasjon ved navn "Langtvekkistan"
        Når jeg henter værmelding for "Langtvekkistan"
        Så skal applikasjonen returnere statuskode "404 Not Found"

    Scenario: Feil ved henting av værmelding fra Yr
        Gitt at jeg har registrert en lokasjon ved navn "Oslo"
        Gitt at Yr ikke returnerer status OK
        Når jeg henter værmelding for "Oslo"
        Så skal applikasjonen returnere statuskode "500 Internal Server Error"

