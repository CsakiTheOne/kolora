import imgEgy5egy from "./images/egy5egy.webp";
import imgKvaterka from "./images/kvaterka.webp";

export interface Artist {
    slug: string;
    category: string;
    name: string;
    description: string;
    imageUrl: string;
    spotifyUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
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
    ] as Artist[],
    artworks: [
        {
            slug: "festival-of-light",
            artistSlug: "lexi",
            ytMusicUrl: "https://music.youtube.com/watch?v=ZYqh_Ze0QqE&si=EypNwLX6aYsXw5lI",
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
