import imgEgy5egy from "./images/egy5egy.webp";

export interface Artist {
    slug: string;
    name: string;
    description: string;
    imageUrl: string;
}

export const KoloraFeszt2026 = {
    artists: [
        {
            slug: "egy5egy",
            name: "egy5egy",
            description: "Kapukód, busz, akkordmenet. Azok vagyunk, akiknek látni akartok. Néha szomorú, néha boldog, kicsit lázadó, kicsit belekényelmesedő. Amit a helyzet hoz.",
            imageUrl: imgEgy5egy,
        },
    ] as Artist[],
};