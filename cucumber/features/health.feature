# language: no

Egenskap: Helseindikatorer

    Scenario: Applikasjonen skal gi status OK hvis den kjører
        Gitt at applikasjonen kjører
        Når jeg kaller helsesjekk for applikasjonen
        Så skal den returnere status "I'm OK"
    
    Scenario: Applikasjonen skal gi status OK for Yr hvis Yr svarer OK på status
        Gitt at Yr ikke returnerer status OK
        Når jeg kaller helsesjekk for applikasjonen
        Så skal den returnere status "Yr is OK"

    Scenario: Applikasjonen skal gi status ikke OK hvis Yr ikke svarer OK på status
        Gitt at Yr ikke returnerer status OK
        Når jeg kaller helsesjekk for applikasjonen
        Så skal den returnere status "Yr is not OK :("
