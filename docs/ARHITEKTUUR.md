# AI-nähtavus ja agendivalmidus: arhitektuur ja edasiarendus

Seis 12.11.2026: teenus on staatiline leht (`ai-nahtavus.html`) ja töö käib käsitsi. Siin on kirjas, mis järgmisena ehitada ja millal. Ühtegi moodulit ei ehitata tehnilise huvi pärast. Iga moodul peab toetama müüki, teenuse kvaliteeti või osutamise kiirust.

## Põhimõtted

- **Avalik repo, avalik väljund.** Kõik selles repos on GitHub Pagesi kaudu nähtav. Kliendiprofiilid, mõõtmistulemused ja mustandid elavad eraldi privaatses repos (soovitus: `RKCD/ai-nahtavus-data`).
- **Kinnitatud ja pakutud on eraldi.** Profiilis on `confirmed` (avaldatakse) ja `proposals` (ei avaldata kunagi). Vaata `docs/profiil.schema.json`.
- **Fakt, vaatlus ja tõlgendus on eraldi väljad.** Vaata `docs/mootmine.schema.json`.
- **Üks andmeallikas.** Profiili JSON on tõeallikas. JSON-LD, Markdown ja lehe tekst genereeritakse sellest, mitte ei kirjutata kolm korda.

## Käsitsi töövoog täna (enne mooduleid)

1. Tellimus tuleb e-postiga: nimi, tegevusala, asukoht, veeb.
2. Analüütik täidab viis küsimust (`ai-nahtavus.html#metoodika-et`) ja esitab need käsitsi kuni kolmele assistendile, kasutades puhast sessiooni ilma isikupärastamiseta.
3. Iga vastus läheb tabelisse, mille veerud vastavad `mootmine.schema.json` välja­dele.
4. Kokkuvõte e-postiga: fakt, vaatlus ja tõlgendus eraldi, koos piirangutega.
5. Aja mõõtmine: märgi iga testi ja profiili juurde kulunud tunnid. Sellest tulevad hinnad.

## Moodulid

### Moodul 1 — ettevõtte profiil

- **Kliendiprobleem:** info on laiali ja vastuoluline, klient ei tea, mida masinale anda.
- **Minimaalne versioon:** üks Python-skript (`tools/profile.py`), mis valideerib profiili JSON-i skeemi vastu ning genereerib JSON-LD (`LocalBusiness` või alamklass) ja Markdowni. Sõltuvusi pole peale `jsonschema`.
- **Andmed ja liidesed:** `profiil.schema.json`; väljund on kliendi veebi `<script type="application/ld+json">` plokk.
- **Millal:** teise profiiliprojekti ajal. Esimene tehakse käsitsi, et näha, mis väljad päriselt vaja on.

### Moodul 2 — mõõtmine

- **Kliendiprobleem:** „kas parandus aitas?" vajab võrreldavaid andmeid.
- **Minimaalne versioon:** standardküsimuste fail (`questions/q5-v1.json`) ja skript, mis võrdleb kahte mõõtmisseeriat ning näitab muutusi (mainiti/ei mainitud, õige/vale). Küsimused esitatakse esialgu käsitsi.
- **Andmed ja liidesed:** `mootmine.schema.json`. Platvormide API-d lisanduvad alles siis, kui käsitsi töö on kitsaskoht ja kasutustingimused seda lubavad.
- **Millal:** kui pideval mõõtmisel on vähemalt 3 maksvat klienti või käsitsi mõõtmine võtab üle 1 tunni kliendi kohta kuus.

### Moodul 3 — paranduste töövoog

- **Kliendiprobleem:** klient ei tea, mida ja kus parandada, ega jõua kõike kinnitada.
- **Minimaalne versioon:** profiili `proposals` nimekirjast genereeritud kinnitusleht (Markdown või PDF), mille klient kinnitab e-postiga. Kinnitus läheb `history` alla.
- **Andmed ja liidesed:** `proposals` ja `history` profiili skeemis.
- **Millal:** koos mooduliga 1, kui kinnitusring võtab rohkem kui kaks e-kirja edasi-tagasi.

### Moodul 4 — kliendiportaal

- **Kliendiprobleem:** klient tahab tulemusi ise vaadata ja profiili muuta.
- **Minimaalne versioon:** kliendipõhine staatiline aruandeleht (privaatne link), mille genereerivad moodulid 1–2. Kontosid ega andmebaasi pole.
- **Andmed ja liidesed:** moodulite 1–3 väljundid. Autentimine ja andmebaas tulevad alles siis, kui klient peab ise andmeid muutma.
- **Millal:** kui kliente on üle 10 ja e-postiga aruandlus võtab märgatavalt aega. Enne seda eraldi privaatsuse ja tingimuste ülevaatus.

### Moodul 5 — agent-ready teenused

- **Kliendiprobleem:** AI-agent küsib kliendi eest hinda või aega ja peab saama üheselt mõistetava vastuse.
- **Minimaalne versioon:** masinloetav teenusekataloog kliendi veebis (JSON koos JSON-LD-ga) ja hinnapäringu vorm, mis jõuab inimeseni. Agent ei broneeri midagi ilma inimese kinnituseta.
- **Andmed ja liidesed:** profiili `services`, `area_served`, `next_step`. Hiljem võib lisanduda API või MCP-liides, kui mõni agendiplatvorm seda päriselt kasutab.
- **Millal:** kui mõni klient saab agendi kaudu päringuid või küsib seda ise. Mitte enne.

## Teadlikult ehitamata

Andmebaas, kasutajakontod, maksed, API-server, MCP-server, automaatne mõõtmismootor, agentide orkestreerimine ja raamistikule üleminek. Igaühe lisamiseks peab olema konkreetne põhjus mõne ülaltoodud mooduli „Millal" tingimusest.
