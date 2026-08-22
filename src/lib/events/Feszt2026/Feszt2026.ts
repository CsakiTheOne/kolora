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
};