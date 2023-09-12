# language: no

Egenskap: Hente værmelding

    Scenario: Hente værmelding for en registrert lokasjon
        Gitt at jeg har registrert en lokasjon ved navn "Hjemme" og koordinater 12 34
        Gitt at Yr returnerer OK ved henting av værdata for koordinater 12 34
        Når jeg henter værmelding for "Hjemme"
        Så skal applikasjonen returnere statuskode "200 OK"
    
    Scenario: Hente værmelding for en ikke-registrert lokasjon
        Gitt at jeg ikke har registrert en lokasjon ved navn "Langtvekkistan"
        Når jeg henter værmelding for "Langtvekkistan"
        Så skal applikasjonen returnere statuskode "404 Not Found"

    Scenario: Feil ved henting av værmelding fra Yr
        Gitt at jeg har registrert en lokasjon ved navn "Hytta" og koordinater 43 21
        Gitt at Yr returnerer en feilkode ved henting av værdata for koordinater 43 21
        Når jeg henter værmelding for "Hytta"
        Så skal applikasjonen returnere statuskode "500 Internal Server Error"

