# language: no

Egenskap: Helseindikatorer

    Scenario: Applikasjonen skal gi status OK hvis den kjører
        Gitt at applikasjonen kjører
        Når jeg kaller helsesjekk for applikasjonen
        Så skal den returnere status for applikasjonen: "I'm OK"
    
    Scenario: Applikasjonen skal gi status OK for Yr hvis Yr svarer OK på status
        Gitt at Yr returnerer status OK
        Når jeg kaller helsesjekk for Yr
        Så skal den returnere status for Yr: "Yr is OK"

    Scenario: Applikasjonen skal gi status ikke OK hvis Yr ikke svarer OK på status
        Gitt at Yr ikke returnerer status OK
        Når jeg kaller helsesjekk for Yr
        Så skal den returnere status for Yr: "Yr is not OK :("
