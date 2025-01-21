# Tesztelői dokumentáció

## Tesztelés célja

Április 11-én a Kolora Egyesület weboldala közösségi funkciókkal bővül. Ezeket az újításokat nem egyszerű megbízhatóan és biztonságosan megvalósítani. A tesztelés célja, hogy az újítások kiadásáig a weboldal minden funkciója hibátlanul működjön, és a felhasználók számára (számotokra) biztonságos legyen.

## Tesztelés ideje

Az új közösségi funkciókat legkésőbb Április 11-én szeretném kiadni és addig folyamatosan szeretném bővíteni az oldalt. A tesztelés tehát Április 11-ig tart. Addig ez a dokumentáció is bővülhet új részekkel.

A kiadás időpontja szintén változhat, de ezt igyekszem időben jelezni nem csak ebben a doksiban.

## Hozzáférés az új dolgokhoz

A [Kolora weboldalán (https://kolora.web.app)](https://kolora.web.app) alapértelmezetten nem érhetőek el az új funkciók. Főoldal, idővonal, kódok és elérhetőségek. Az új funkciók eléréséhez a következő linket kell használni:

<https://kolora.web.app/?accountfeatures=true>

Ennek a linknek a megnyitásakor a fejléc jobb szélén látható lesz egy bejelentkezés gomb. Ez az első újdonság és ezen keresztül érhetőek el az új funkciók.

> **Fontos:** Ha megtörtént az első bejelentkezés, írj rám, hogy tudjak adni pár extra jogosultságot, amivel a tesztelés könnyebb lesz.

> Ha csak simán használod az oldalt és véleményeket írogatsz néha, azzal is sokat segítesz. De lejjebb olvashatod, hogy pontosan mikre vagyok kíváncsi.

## Mit és hogyan kell tesztelni?

### Felfedezés

Első és legfontosabb: Fedezd fel az újonnan megjelent oldalakat. Ebbe beletartozik a saját profilod, más ember profilja, galéria, művek olvasása és szerkesztése, stb.

Egyértelmű a navigáció? Megtalálod, amit keresel? Van oldal, amit hiányolsz?

### Jogosultságok

A weboldal új funkcióihoz jogosultságok tartoznak. Például csak a saját műveidet szerkesztheted, de másokét nem. Nézd meg, hogy a jogosultságok megfelelően működnek-e.

Tudsz csinálni valamit, amit nem kéne tudnod? Esetleg hiányolsz valamit, amit szerinted meg kéne tudnod csinálni?

> Valószínű, hogy kicsit több dolgot fogsz tudni csinálni, mint egy átlag felhasználó. A tesztelés kedvéért valószínű kaptok egy "kolora tag" szerepet. (Ezzel láthatjátok például a galériában a várakozó műveket.)

### Biztonság - input mezők

A weboldalon sok helyen vannak szövegdobozok. Mű szerkesztésnél a mű adatai és tartalma, a profilnál a felhasználóneved és bio-d. Az ilyesmi mezőkbe próbálj hülyeségeket írni, hogy a weboldal hogyan reagál. (Esetleg infós hátterű tesztelők próbálkozhatnak XSS támadással is.)

### Szerkesztő

A művek szerkesztője egy új funkció, ami nem a legegyszerűbb. Próbálgasd, alkoss valamit és nézd meg, hogy a szerkesztő hogyan viselkedik. Ha valami nem működik, nem egyértelmű, vagy csak furcsa, írj!

### Vizsgálatok

Előfordulhatnak az oldalon hibák, amiket nem sikerült pontosan megfejtenem. Hatalmas segítség, ha az itt felsorolt hibákkal kapcsolatban tudsz valami infót adni.

- [ ] Az oldal néha elfelejti a beállított felhasználónevet és visszaállítja az alapértelmezettre.

### Egyebek

Ha bármi más furcsaságot észlelsz, ami nem a fenti kategóriákba tartozik, vagy van bármi ötleted írj róla!

## Jelenleg ezeken dolgozom, ezek vannak tervben

- [ ] Anoním megosztás
- [ ] Mű elutasítás indoklás
- [ ] Elutasítás és elfogadás több emberen múljon (2-3 ember minimum)
- [ ] Szabályok a megosztható művekkel kapcsolatban
- [ ] Szöveg formázás az írott mű típusoknál
- [ ] Felhasználó és mű jelentése
- [x] Profil bio-kban XSS védelem
