import imgEgy5egy from "./images/egy5egy.webp";

export interface Artist {
    slug: string;
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
            name: "egy5egy",
            description: "Kapukód, busz, akkordmenet. Azok vagyunk, akiknek látni akartok. Néha szomorú, néha boldog, kicsit lázadó, kicsit belekényelmesedő. Amit a helyzet hoz.",
            imageUrl: imgEgy5egy,
            spotifyUrl: "https://open.spotify.com/artist/7uB1gJyQgeD9idb7h2VByx?si=XixG3pDkQmeg7N93GvSZ2A",
            youtubeUrl: "https://www.youtube.com/@egy5egy",
            instagramUrl: "https://www.instagram.com/egy5egy/",
        },
    ] as Artist[],
};