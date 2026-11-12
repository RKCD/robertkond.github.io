# Reeglid AI-toimetajale

See on Robert Kondi avalik visiitkaart. Iga lause on tema nimel öeldud väide.

## Sisu

- Ära lisa projekte, numbreid, kliente ega oskusi, mida Robert pole kinnitanud. AI-sessioonis ehitatud kood ei ole automaatselt tema töö ega tõend. Kui pole kindel, küsi temalt.
- AI Acti kuupäevad tulevad ainult tööriista õiguskorpusest (`eu-ai-act-checker/legal_corpus.py`). Ära kirjuta kuupäevi mälu järgi. Kui korpus uueneb, uuenda radarit ja lauset „last checked by hand".
- Ära leiuta regulatiivseid fakte ega artiklinumbreid.
- E-post jääb acceleratedigitaltwin@gmail.com.
- Ministeeriumi tööaastaid lehel ei näidata.
- Sõna „futurist" ei kasutata. Ettevaade näidatakse kuupäevadega.
- Avaleht (`index.html`) ei tohi pikemaks minna. Uus asi asendab vana. Teenuse sisu on `ai-nahtavus.html` lehel.

## Hääl

- Lühikesed, konkreetsed laused. Kõnekeelset õhku ega müügimehe tooni ei ole.
- Ei kasutata hüüumärke ega emotikone.
- Eestikeelne tekst peab olema loomulik eesti keel, mitte tõlge.

## Disain

- Öötaevas, üks kuldne aktsent. Hoia see vaoshoitud ja ära tee seda kirjuks.
- Teemasildid triivivad portree poole ja kaovad teksti juures. Kui külastaja on liikumise välja lülitanud, jääb pilt paigale.
- Enne pushi kontrolli 375px ja töölaua laiusel. Lehel ei tohi olla külgkerimist ja konsool peab olema puhas.

## AI-nähtavuse teenus (`ai-nahtavus.html`)

- Teenuselehel võib olla selge müügisõnum ja üleskutse, aga sama häälega: lühikesed laused, ei hüüumärke ega superlatiive.
- Ära luba, et mõni AI hakkab klienti soovitama, ega otsingupositsioone või müügitulemusi. Schema.org ja llms.txt ei ole garantii.
- Ära avalda hindu peale „tasuta". Ära lisa kliente, logosid, iseloomustusi ega mõõtmistulemusi, mida pole päriselt olnud.
- JSON-LD peab vastama lehel nähtavale tekstile. Kui muudad teenuste sisu, uuenda ka JSON-LD-d, `llms.txt` ja `teenused.md`.
- AI vastuseid ei esitata faktina. Mõõtmistulemustes on fakt, vaatlus ja tõlgendus eraldi.
- Teiste ettevõtete nimesid, mis mõõtmistes esinevad, ei avaldata ilma loata.
- Mustandid, mõõtmisandmed ja kliendiprofiilid ei kuulu sellesse avalikku reposse.
- Ära väida, et teenus on õiguslikult või GDPR-i mõttes auditeeritud.

## Töökord

- Töö käib feature branch'is. `main` harusse ei push'ita ilma Roberti loata.
- Väikesed, loogilised commit'id.
- Uut tehnoloogiat (raamistik, backend, andmebaas) ei lisata ilma põhjenduseta `docs/ARHITEKTUUR.md` alusel.
