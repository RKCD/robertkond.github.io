# robertkond.github.io

Robert Kondi isiklik leht: https://rkcd.github.io/robertkond.github.io/

## Failid

- `index.html` on esileht, `theses.html` on teeside leht. Mõlemas on inglise keel vaikimisi, eesti keel on lülitiga.
- `site.css` ja `site.js` on mõlema lehe ühine kujundus ja skript (loendurid, kuupäevade värskus, keelelüliti, e-posti kopeerimine).
- `robert-avatar.jpg` on portree, `hero-bg.jpg` hero taust, `og-image.jpg` jagamispilt.
- `.nojekyll` ütleb GitHub Pagesile, et faile ei töödelda.

## Muutmine

1. Muuda `index.html` või `theses.html`. Iga tekstimuudatus tuleb teha mõlemas keeleplokis (`data-lang="en"` ja `data-lang="et"`).
2. Vaata lehte kohapeal: `npx serve .` ja ava http://localhost:3000.
3. Kontrolli 375px laiusel, et lehel pole külgkerimist ja konsool on puhas.
4. Uuenda jaluses kuupäeva „Last updated" / „Viimati uuendatud".
5. Tee commit ja push harusse `main`. GitHub Pages avaldab lehe umbes minutiga.

Sisureeglid AI-toimetajale on failis [CLAUDE.md](CLAUDE.md).
