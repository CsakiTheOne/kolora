import imgEgy5egy from "./images/egy5egy.webp";
import imgKvaterka from "./images/kvaterka.webp";
import imgBrumiko from "./images/brumiko.webp";
import imgDeafSoundcheck from "./images/deaf-soundcheck.webp";
import imgCarnivora from "./images/carnivora_cropped.webp";
import imgKam from "./images/kam.webp";
import imgPorszem from "./images/porszem.webp";

export interface Artist {
    slug: string;
    category: string;
    name: string;
    description: string;
    imageUrl: string;
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
            youtubeUrl: "https://youtu.be/A-3XY6MWvxg?si=SX7Ki1V5yyGelpZD",
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
            slug: "lexi",
            category: "festő",
            name: "Lexi",
            description: "TODO: Bemutatkozás szöveg",
            instagramUrl: "https://www.instagram.com/the_lexiart_gallery/",
            hidden: true,
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
            ytMusicUrl: "https://music.youtube.com/watch?v=L6VgXgDrPfM&si=WeIWfniUT7pB5xqT",
            notes: "Kisah Romantis - The Bakuucakar & Lalahuta",
        },
        {
            slug: "wolf-in-sheeps-clothing",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=VM6bPbOnK9w&si=zY_lCE7pEuuh7qWk",
            notes: "Wolf in Sheep's Clothing feat. William Beckett - Set It Off",
        },
        {
            slug: "flight-of-the-silverbird",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=u2OBz9mcPJ4&si=iVJnsa8cALXvtbMV",
            notes: "Flight of the Silverbird - Thomas Bergersen",
        },
        {
            slug: "megalovania-epic-version",
            artistSlug: "lexi",
            spotifyUrl: "https://open.spotify.com/track/3DtQrGA4FVij8XcFL4V9yE?si=6b7578cd4a084178",
            youtubeUrl: "https://youtu.be/TrqObE57shk?is=V2CtVfFl_7vWpYmF",
            notes: "Megalovania (Epic Version) - Carameii",
        },
        {
            slug: "sanemi-and-gyomei-vs-kokushibo-v2",
            artistSlug: "lexi",
            youtubeUrl: "https://youtu.be/ZhewkECoUjI?is=kbzherGWb_qIMLRm",
            notes: "Sanemi and Gyomei vs Kokushibo V2 (Fanmade) - Gareth Ryan",
        },
    ] as Artwork[],
};
