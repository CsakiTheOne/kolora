import imgEgy5egy from "./images/egy5egy.webp";
import imgKvaterka from "./images/kvaterka.webp";
import imgBrumiko from "./images/brumiko.webp";
import imgDeafSoundcheck from "./images/deaf-soundcheck.webp";
import imgCarnivora from "./images/carnivora_cropped.webp";
import imgKam from "./images/kam.webp";
import imgBolygo from "./images/bolygo.webp";
import imgPorszem from "./images/porszem.webp";
import imgKoriander from "./images/koriander.webp";
import imgTearaza from "./images/tearaza.webp";
import imgZenDogz from "./images/zen-dogz.webp";
import imgLexi from "./images/lexi.webp";
import imgBodonyiDani from "./images/dj/bodonyi-dani.webp";
import imgHyperTanzer from "./images/dj/hypertanzer.webp";
import imgKohi from "./images/dj/kohi.webp";
import imgVarga from "./images/dj/varga.webp";
import imgH3ad3mpty from "./images/dj/h3ad3mpty.webp";

export interface Artist {
    slug: string;
    category: string;
    name: string;
    description?: string;
    imageUrl?: string;
    spotifyUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
    hidden?: boolean;
}

export interface Artwork {
    slug: string;
    artistSlug: string;
    spotifyUrl?: string;
    youtubeUrl?: string;
    ytMusicUrl?: string;
    notes?: string;
}

export const KoloraFeszt2026 = {
    artists: [
        {
            slug: "egy5egy",
            category: "zenekar",
            name: "egy5egy",
            description: "Kapukód, busz, akkordmenet. Azok vagyunk, akiknek látni akartok. Néha szomorú, néha boldog, kicsit lázadó, kicsit belekényelmesedő. Amit a helyzet hoz.",
            imageUrl: imgEgy5egy,
            spotifyUrl: "https://open.spotify.com/artist/7uB1gJyQgeD9idb7h2VByx",
            youtubeUrl: "https://www.youtube.com/@egy5egy",
            instagramUrl: "https://www.instagram.com/egy5egy/",
        },
        {
            slug: "kvaterka",
            category: "zenekar",
            name: "Kvaterka",
            description: "Dunamenti sanzonrock, kávéházi new wave. A Kvaterka számos műfaj szintézisét keveri palettáján egységes koncepcióvá. Szövegcentrikus zenéjükre nagy hatással volt a 80-as évek pesti undergroundja és a Cseh-Másik-Bereményi szerzőtriász munkássága.",
            imageUrl: imgKvaterka,
            spotifyUrl: "https://open.spotify.com/artist/4saOqPzmr82yEkBYPjHjPH",
            youtubeUrl: "https://youtu.be/A-3XY6MWvxg",
            instagramUrl: "https://www.instagram.com/kvaterkaperka/",
        },
        {
            slug: "brumiko",
            category: "zenekar",
            name: "Brumiko",
            description: "Brumiko Győri Brúnó projektje, amelyben az alternatív pop, az elektronikus hangzás és a személyes hangvételű dalszövegek találkoznak. A Brumiko-dalok gyakran melankolikus, mégis játékos hangulatúak, és az intim, lo-fi világot modern popérzékenységgel ötvözik. Élőben minimalista felállásban, közvetlen hangulatú koncerteken szólalnak meg a dalok.",
            imageUrl: imgBrumiko,
            spotifyUrl: "https://open.spotify.com/artist/5SVttRH8PTal59RNTpPGpE",
            youtubeUrl: "https://youtu.be/qLJHVMCXeOc",
            instagramUrl: "https://www.instagram.com/brumiko_projekt/",
        },
        {
            slug: "deaf-soundcheck",
            category: "zenekar",
            name: "Deaf Soundcheck",
            description: "A DEAF SOUNDCHECK egy Budapesti alternatív rockzenekar. Fura szövegek, még furább hangzásvilág egy kis Indie és Posztrockkal vegyítve. A zenekar 2024-ben alakult, és még abban az évben megjelentette első négyszámos angol EP-jét Demos & Stuff címmel, azóta folyamatosan koncertezik és anyanyelvén folytatja a muzsikálást.  Szeretnénk itthonra a kísértetiesen kisérleties zenéket behozni és egy klafa közösséget kialakítani",
            imageUrl: imgDeafSoundcheck,
            spotifyUrl: "https://open.spotify.com/artist/46wls20a4TAvvtQCfrwvOr",
            youtubeUrl: "https://youtu.be/L4pGclCtpGM",
            instagramUrl: "https://www.instagram.com/deafsoundcheck/",
        },
        {
            slug: "carnivora",
            category: "duó",
            name: "Carnivora",
            description: "Egy szál akusztikus gitár, két énekhang és a huszonéves hétköznapok őszinte pillanatai. Zenévé formálják mindazt, amit a saját bőrükön tapasztalnak meg a világból. Érzelmes, változatos műfajú dalaikban saját felnövéstörténeteiket, csalódásaikat és apró örömeiket mesélik el, intim és magával ragadó hangulatot teremtve a közönségnek.",
            imageUrl: imgCarnivora,
            youtubeUrl: "https://youtu.be/Nl7dzU15QtI",
            instagramUrl: "https://www.instagram.com/carnivora_music/",
        },
        {
            slug: "kam",
            category: "zenész",
            name: "KAM",
            description: "21 éves, budapesti feltörekvő zenész. Többnyire akusztikus, gitáros fellépésekkel járja az országot, és olyan rendezvények szavaztak már neki bizalmat, mint a Miskolci Piknik, Veszprémi, Debreceni vagy a Budapesti Utcazene Fesztivál, emellett a Petőfi rádióban is szerepelt. Célja, hogy az őszinte, saját, indie-pop dalait még a zuhany alatt is énekelje a közönsége.",
            imageUrl: imgKam,
            spotifyUrl: "https://open.spotify.com/artist/0rK35UA0oz3k3LDpdGgQHO",
            youtubeUrl: "https://www.youtube.com/channel/UCPj0fJ0Zbnt7eooeyb1vTYw",
            instagramUrl: "https://www.instagram.com/here.i.kam._/",
        },
        {
            slug: "bolygo",
            category: "zenekar",
            name: "Bolygó",
            description: "A pécsi székhelyű zenekar második nagylemezén új hangzásokkal kísérletezik: az 'ami nincs még azt akarom' című 10 számos albumon keverednek az őszinte szövegek, a shoegaze-es éteri gitártémák és a feszes progresszív groove-ok.",
            imageUrl: imgBolygo,
            spotifyUrl: "https://open.spotify.com/artist/71tlOMdMDHWLGVsLaYUghg",
            youtubeUrl: "https://youtu.be/kULElwLqmb4",
            instagramUrl: "https://www.instagram.com/bolygo_zenekar/",
        },
        {
            slug: "porszem",
            category: "zenekar",
            name: "Porszem",
            description: "Nem szeretjük magunkat... zeneileg beskatulyázni. Egy biztos, hogy kifejezetten versfeldolgozások terén tevékenykedünk. A Porszem zenei palettája a görög ódák lágy és elszenderítő hangulatvilágától a piszkos rakendrollig (🤘😎👍) terjed. Ha szükséged van egy kis háttérzajra a lapátolás, vagy az Excel-táblázatok varázslása közepette, mindenképp kapcsolj rá a Porszem-fm rádióra (👁👄👁👂 🎶🎶 📻)! Hogy a jövő dalát naprakészen halljad, hallgass minket még tegnap a világháló különböző pontjain! ✌️😎 ☮️☮️",
            imageUrl: imgPorszem,
            spotifyUrl: "https://open.spotify.com/artist/7GBHZCNkbwsN1xo59Y98FN",
            youtubeUrl: "https://www.youtube.com/channel/UCwB944VGOicgwddVpNNz9MQ",
            instagramUrl: "https://www.instagram.com/porszemband/",
        },
        {
            slug: "koriander",
            category: "zenekar",
            name: "korïander",
            description: "A 2025 telén körvonalazódott korïander műfajokon átívelő gasztronómiai utazás a neo soul a soul funk és a pszichedelikus jazz világában. Szokatlan ritmusok, többszólamú vokál, garantált extázis.",
            imageUrl: imgKoriander,
            instagramUrl: "https://www.instagram.com/koriander.wav/",
        },
        {
            slug: "tearaza",
            category: "zenekar",
            name: "Tearaža",
            description: "A Punk nyers torzított hangzása ötvözve a New Wave-el, sikítozás szatírikus, íronikus szövegekkel telibe az arcodba. Kemény torzulás, feszes ritmusok, fülbemászó dallamok. Köcsög 🐁🎸",
            imageUrl: imgTearaza,
            instagramUrl: "https://www.instagram.com/tearaza_band/",
        },
        {
            slug: "zen-dogz",
            category: "zenekar",
            name: "Zen Dogz",
            description: "A Zen Dogz egy kísérleti alternatív hiphop zenekar. Stílusa nyers, Budapest éjszakai életének urbánus hangulatát közvetíti. Energikus ütemek és éles szójátékokra épülő szövegek által nyerünk betekintést nem mindennapi mindennapjaikba. Egyedi hangzásviláguk rögtön felismerhető; elektronikus elemek, pszihedelikus gitárok, koszos dob groove-ok autentikus ötvözete.",
            imageUrl: imgZenDogz,
            spotifyUrl: "https://open.spotify.com/artist/3T4v8NtoKiYfDusWA2LlRi",
            youtubeUrl: "https://youtu.be/wn6CwLGO82w",
            instagramUrl: "https://www.instagram.com/zen_dogz/",
        },
        {
            slug: "lexi",
            category: "kiállító",
            name: "Lexi",
            description: "Leginkább akrillal dolgozom, vászonra festek, kedvenc témáim mindig is az állatok voltak. A stílusomat nem tudom megfogalmazni, de színesnek és élettel telinek szeretem megalkotni a képeimet. Sokszor a zene inspirál, és egy-egy dallam indít el bennem egy teljes koncepciót. Olyan helyet alkotok, ahová elvárások és mások szabályai nélkül jó csak úgy hazatérni. Remélem, hogy aki ránéz a képeimre, egy pillanatra maga is beléphet ebbe a világba, amit én úgy hívok: otthon.",
            imageUrl: imgLexi,
            instagramUrl: "https://www.instagram.com/the_lexiart_gallery/",
        },
        {
            slug: "furi",
            category: "kiállító",
            name: "Fűrész",
            description: "Egész fesztivál alatt megtekinthető kiállítás. Címe: Skizofrénia",
        },
        {
            slug: "boti",
            category: "kiállító",
            name: "Boti",
            description: "Egész fesztivál alatt megtekinthető kiállítás.",
            hidden: true,
        },
        {
            slug: "alex",
            category: "kiállító",
            name: "Kasó Alex",
            description: "Egész fesztivál alatt megtekinthető kiállítás. Címe: Ma még megőrülök",
            instagramUrl: "https://www.instagram.com/a_vilagjaro_vilagtalan/",
        },
        {
            slug: "r-kocsy-tamas",
            category: "kiállító",
            name: "R. Kocsy Tamás",
            description: "Egész fesztivál alatt megtekinthető kiállítás. Címe: ROZZSDA FOTÓSOROZAT",
        },
        {
            slug: "frida",
            category: "workshop",
            name: "Frida",
            description: "Horgoló workshop.",
            instagramUrl: "https://www.instagram.com/horgolt_sziv/",
        },
        {
            slug: "imi",
            category: "workshop",
            name: "Kalafatics Imre",
            description: "Karkötő és övkészítés kártyaszövéssel.",
        },
        {
            slug: "vesztu",
            category: "workshop",
            name: "Vesztu",
            description: "Linómetszés workshop.",
            instagramUrl: "https://www.instagram.com/vesztutattoo/",
        },
        {
            slug: "adami-atelier",
            category: "workshop",
            name: "Adami Atelier",
            description: "Mix & Match, sapka készítő workshop.",
            instagramUrl: "https://www.instagram.com/adami.atelier/",
        },
        {
            slug: "bodonyi-dani",
            category: "dj",
            name: "Bodonyi Dani",
            imageUrl: imgBodonyiDani,
        },
        {
            slug: "hypertanzer",
            category: "dj",
            name: "HYPERtänzer",
            imageUrl: imgHyperTanzer,
        },
        {
            slug: "kohi",
            category: "dj",
            name: "KØHI",
            imageUrl: imgKohi,
        },
        {
            slug: "varga",
            category: "dj",
            name: "VARGA",
            imageUrl: imgVarga,
        },
        {
            slug: "h3ad3mpty",
            category: "dj",
            name: "H3AD3MPTY",
            imageUrl: imgH3ad3mpty,
        },
    ] as Artist[],
    artworks: [
        {
            slug: "festival-of-light",
            artistSlug: "lexi",
            spotifyUrl: "https://open.spotify.com/track/0Kqk2Aag1a7qX7i4dCmlzw",
            youtubeUrl: "https://youtu.be/lcoLjDXXAeI",
            ytMusicUrl: "https://music.youtube.com/watch?v=ZYqh_Ze0QqE",
            notes: "Festival of Light - Audiomachine",
        },
        {
            slug: "kisah-romantis",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=L6VgXgDrPfM",
            notes: "Kisah Romantis - The Bakuucakar & Lalahuta",
        },
        {
            slug: "wolf-in-sheeps-clothing",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=VM6bPbOnK9w",
            notes: "Wolf in Sheep's Clothing feat. William Beckett - Set It Off",
        },
        {
            slug: "flight-of-the-silverbird",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=u2OBz9mcPJ4",
            notes: "Flight of the Silverbird - Thomas Bergersen",
        },
        {
            slug: "megalovania-epic-version",
            artistSlug: "lexi",
            spotifyUrl: "https://open.spotify.com/track/3DtQrGA4FVij8XcFL4V9yE",
            youtubeUrl: "https://youtu.be/TrqObE57shk",
            notes: "Megalovania (Epic Version) - Carameii",
        },
        {
            slug: "sanemi-and-gyomei-vs-kokushibo-v2",
            artistSlug: "lexi",
            youtubeUrl: "https://youtu.be/ZhewkECoUjI",
            notes: "Sanemi and Gyomei vs Kokushibo V2 (Fanmade) - Gareth Ryan",
        },
        {
            slug: "xian",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=vyuUcTewmBI",
            notes: "Xian - Antti Martikainen",
        },
        {
            slug: "i-wanna-be-like-you",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=8bZsVehylvY",
            notes: "I Wanna Be Like You (Electro Swing Remix) - Dave Wave",
        },
    ] as Artwork[],
    lineup: [
        //
        // Csütörtök (szeptember 24)
        //
        // Workshop
        {
            day: 24,
            artistSlug: "imi",
            startTime: "18:00",
        },
        // Fellépő
        {
            day: 24,
            artistSlug: "kam",
            startTime: "21:00",
        },
        //
        // Péntek (szeptember 25)
        //
        // Workshopok
        {
            day: 25,
            artistSlug: "frida",
        },
        {
            day: 25,
            artistSlug: "vesztu",
        },
        // Fellépők
        {
            day: 25,
            artistSlug: "bolygo",
            startTime: "19:00",
        },
        {
            day: 25,
            artistSlug: "koriander",
            startTime: "20:00",
        },
        {
            day: 25,
            artistSlug: "kvaterka",
            startTime: "21:00",
        },
        {
            day: 25,
            artistSlug: "brumiko",
            startTime: "22:00",
        },
        // Kolora x Bilox after
        {
            day: 25,
            artistSlug: "bodonyi-dani",
            startTime: "23:00",
        },
        {
            day: 25,
            artistSlug: "hypertanzer",
            startTime: "00:30",
        },
        //
        // Szombat (szeptember 26)
        //
        // Workshopok
        {
            day: 26,
            artistSlug: "adami-atelier",
        },
        {
            day: 26,
            artistSlug: "vesztu",
        },
        {
            day: 26,
            artistSlug: "imi",
        },
        {
            day: 26,
            artistSlug: "frida",
        },
        // Fellépők
        {
            day: 26,
            artistSlug: "carnivora",
            startTime: "18:00",
        },
        {
            day: 26,
            artistSlug: "deaf-soundcheck",
            startTime: "19:00",
        },
        {
            day: 26,
            artistSlug: "egy5egy",
            startTime: "21:00",
        },
        {
            day: 26,
            artistSlug: "zen-dogz",
            startTime: "22:10",
        },
        {
            day: 26,
            artistSlug: "tearaza",
            startTime: "23:20",
        },
        // Kolora x Bilox after
        {
            day: 26,
            artistSlug: "kohi",
            startTime: "00:30",
        },
        {
            day: 26,
            artistSlug: "varga",
            startTime: "01:40",
        },
        {
            day: 26,
            artistSlug: "h3ad3mpty",
            startTime: "02:50",
        },
    ],
};
