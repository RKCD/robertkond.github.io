# robertkond.github.io

Robert Kondi leht ja AI-nähtavuse teenus: https://rkcd.github.io/robertkond.github.io/

## Arhitektuur

Puhas staatiline leht GitHub Pagesis. Build-sammu, raamistikku ega sõltuvusi pole. `.nojekyll` ütleb Pagesile, et faile ei töödelda, seega **iga repos olev fail on avalikult URL-iga kättesaadav**.

| Fail | Mis see on |
|---|---|
| `index.html` | Isiklik avaleht. Inglise keel vaikimisi, eesti keel lülitiga (`?lang=et`). |
| `ai-nahtavus.html` | AI-nähtavuse teenuse leht. Eesti keel vaikimisi, inglise keel `?lang=en`. JSON-LD on `<head>`-is. |
| `theses.html` | Teesid. Inglise keel vaikimisi. |
| `blog/index.html` | Mõõtmiste register. `blog/post-template.html` on artikli mall (noindex, linkimata). |
| `llms.txt` | Lühike masinloetav ülevaade lehest ja teenusest. |
| `teenused.md` | Teenuste kirjeldus Markdownis, inimesele ja masinale. |
| `docs/` | Arhitektuur (`ARHITEKTUUR.md`) ning profiili ja mõõtmise andmeskeemide kavandid. |
| `site.css`, `site.js` | Ühine kujundus ja skript: loendurid, kuupäevade värskus, keelelüliti, e-posti kopeerimine, tellimisvorm. |
| `robert-avatar.jpg`, `hero-bg.jpg`, `og-image.jpg` | Pildid. |

**Keeled.** Mõlemad keeled on samas failis kahe plokina (`<div class="page" data-lang="…">`). Lehe vaikekeel on `<html data-default-lang="…">` atribuudis, puudumisel inglise keel. Teise keele saab avada `?lang=xx` või `-xx` lõpuga ankruga (`#test-en`).

**Tellimisvorm.** `form.order` koostab eeltäidetud `mailto:`-lingi ega salvesta midagi. Ilma JavaScriptita saadab brauser vormi `mailto` kaudu.

## Muutmine ja käivitamine

1. Muuda faili. Iga tekstimuudatus tuleb teha mõlemas keeleplokis.
2. Vaata kohapeal: `npx serve .` või `python3 -m http.server`, ava http://localhost:3000 või :8000.
3. Kontrolli 375 px ja töölaua laiusel: külgkerimist pole, konsool on puhas, keelelüliti töötab.
4. Kui muutsid `ai-nahtavus.html` teenuste sisu, uuenda samas JSON-LD-d, `llms.txt` ja `teenused.md`.
5. Uuenda jaluses kuupäeva.

## Testimine

- **Struktureeritud andmed:** kleebi lehe URL või HTML https://validator.schema.org/ ja Google Rich Results Testi. JSON-LD peab vastama lehel nähtavale tekstile: ei mingeid hindu peale tasuta testi, hinnanguid ega kliente.
- **Mobiil ja keeled:** Playwright või brauseri arendustööriistad, 375 px. Ava iga leht nii vaike- kui ka teises keeles.
- **Lingid:** kõik sisemised lingid ja ankrud peavad avanema mõlemas keeles.
- **Tellimisvorm:** täida ja vajuta nuppu. E-posti programm peab avanema eeltäidetud kirjaga.

## Avaldamine

Töö käib feature branch'is (nt `feature/ai-visibility`). `main` harusse lähevad muudatused ainult Roberti loal, pull request'i kaudu. GitHub Pages avaldab `main` haru umbes minutiga.

## Mustandid ja kliendiandmed

Repo on avalik. Mõõtmisandmed, kliendiprofiilid ja artiklimustandid **ei tohi sellesse reposse sattuda**, ka mitte linkimata kujul: need oleksid GitHubis ja Pagesis avalikud. Hoia neid eraldi privaatses repos. `.gitignore` blokeerib `drafts/` ja `mootmised/` kaustad ainult kaitsevõrguna.

Sisureeglid AI-toimetajale on failis [CLAUDE.md](CLAUDE.md).
