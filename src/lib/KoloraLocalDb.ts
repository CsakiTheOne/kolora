import ThemeManager from "./ThemeManager";
import imgMusicianBodonyiDani from "$lib/images/musicians/bodonyi-dani-banner.jpg";
import imgMusicianCrescendoSelecta from "$lib/images/musicians/crescendo-selecta-banner.jpg";
import imgMusicianEgy5Egy from "$lib/images/musicians/egy5egy-banner.jpg";
import imgMusicianJex from "$lib/images/musicians/jex-banner.png";
import imgMusicianKalafaticsImre from "$lib/images/musicians/kalafatics-imre.png";
import imgMusicianKory from "$lib/images/musicians/kory.jpg";
import imgMusicianLoophia from "$lib/images/musicians/loophia-banner.jpg";
import imgMusicianNaez from "$lib/images/musicians/naez-logo.jpg";
import imgMusicianNedela from "$lib/images/musicians/nedela-banner.jpg";
import imgMusicianWaitingRoom from "$lib/images/musicians/waiting-room-banner.jpg";
import { recordEvent } from "./firebase/analytics";

export default class KoloraLocalDb {
    static musicians = [
        {
            name: "Bodonyi Dani",
            bannerImageUrl: imgMusicianBodonyiDani,
            websiteUrl: "https://www.facebook.com/profile.php?id=100079430298985",
            songUrls: [
                "https://www.mixcloud.com/Daniel_Bodonyi/bodonyi-dani-caf%C3%A9-at-museum-essentials/",
            ],
        },
        {
            name: "egy5egy",
            bannerImageUrl: imgMusicianEgy5Egy,
            websiteUrl: "https://www.facebook.com/egy5egyzenekar",
        },
        {
            name: "The JEX",
            bannerImageUrl: imgMusicianJex,
            websiteUrl: "https://linktr.ee/thejexofficial",
            songUrls: [
                "https://youtu.be/aNlgE6vcbiI?si=F8zA4cdpKtEeYhYJ",
                "https://youtu.be/5F-3pPWINsM?si=tTqJ7CnOBIh-HwCQ",
            ],
        },
        {
            name: "Kalafatics Imre",
            bannerImageUrl: imgMusicianKalafaticsImre,
        },
        {
            name: ".kory",
            bannerImageUrl: imgMusicianKory,
            websiteUrl: "https://www.instagram.com/korymakesmusikk",
        },
        {
            name: "Loophia",
            bannerImageUrl: imgMusicianLoophia,
            websiteUrl: "https://linktr.ee/loophia",
            songUrls: [
                "https://youtu.be/wPRzs-mLwQk?si=bAETfHu-F6keD3w_",
                "https://youtu.be/AvqETiAWtD8?si=UM5mchuEgeio_1_D",
                "https://youtu.be/hQgdI4shsOI?si=ADujifbKgXxp81G9",
            ],
        },
        {
            name: "Næz",
            bannerImageUrl: imgMusicianNaez,
            websiteUrl: "https://linktr.ee/naez.official",
            songUrls: [
                "https://youtu.be/Z4HPjjrMgno?si=1PwDwBZaaWyPdVa5",
                "https://youtu.be/huscK-IdVpU?si=8yCj4So1uXwISXsl",
                "https://youtu.be/cTKLLtIT80k?si=CohC9hXgwwKOfJRF",
                "https://youtu.be/bPYI48u_9YI?si=SZQCpiHFnbQDJiRt",
                "https://youtu.be/m0Y673xxvzQ?si=1QZAB9sTvMDhrAlJ",
                "https://youtu.be/znyVyI8eeVE?si=rw_kIX_nlyJgfU7L",
                "https://youtu.be/tmUzz82wAZ0?si=Pw9cVeSuMqGnPJAF",
                "https://youtu.be/8Mju0CCZemA?si=jbeJeekI-67Uz39f",
            ],
        },
        {
            name: "Nedel'a",
            bannerImageUrl: imgMusicianNedela,
            websiteUrl: "https://linktr.ee/nedela_zenekar",
            songUrls: [
                "https://youtu.be/kDXxczfc9ik?si=klf2zb7hHnnK0u-X",
                "https://youtu.be/uWwkJXTX5rk?si=2Po9ujGyQGMAuhmz",
            ],
        },
        {
            name: "Waiting Room",
            bannerImageUrl: imgMusicianWaitingRoom,
            websiteUrl: "https://linktr.ee/waiting_room",
            songUrls: [
                "https://youtu.be/sk3WEAAOMls?si=ytBouSl9JlU94J09",
                "https://youtu.be/UW_gjiilXYQ?si=xYs1G5uXYszWQu4h",
                "https://youtu.be/6__DN31kaXE?si=0mwuskw-t7Vz4p7O",
                "https://youtu.be/G7CLtL6yLyM?si=rtAGrHIr6_exzqu7",
                "https://youtu.be/iHcrnqhpH-c?si=l_XSpyP0VZG2ekVv",
                "https://youtu.be/LMMUJI9eyrg?si=HDerWSI5gb3VuzEY",
                "https://youtu.be/NMajHHufk54?si=hs8Y9CwjxSOcsyg-",
                "https://youtu.be/_F-gC_YQ3v8?si=6YQh8l04Ge6qmkGW",
                "https://youtu.be/ktqHOTsD2m8?si=Dq_XZ2JrVBmnwkGZ",
            ],
        },
    ];

    static getMusician(name: string) {
        return KoloraLocalDb.musicians.find(m => m.name === name);
    }

    static secrets: {
        code: string;
        action?: "message" | "setTheme";
        data?: string;
        url?: string;
    }[] = [
        {
            code: "summer2025",
            action: "message",
            data: "A Kolora egy nyári eseményéhez kapsz egy kis előretekintést! Ne add tovább senkinek!",
            url: "https://youtu.be/xvFZjo5PgG0?si=PcA0vjTsDwMeEUfN",
        },
        {
            code: "230621",
            action: "setTheme",
            data: "theme-retro",
        },
        {
            code: "csobal",
            url: "/404",
        },
        {
            code: "ny8lcas.sl24m",
            url: "https://youtu.be/-9d2Bm0v4dk",
        },
        {
            code: "pirospultos",
            url: "https://photos.app.goo.gl/MsuistyMjtUpRCu16",
        },
        {
            code: "0220",
            url: "/poi/?id=q0q6nRgyI6Sf8eRsZqqp&ignoreLocation=1",
        },
    ];

    static tryCode(code: string) {
        const secrets = KoloraLocalDb.secrets.filter(s => s.code === code);

        recordEvent("code_redeem", {
            code: code,
            success: secrets.length > 0,
        });

        if (!secrets) {
            return null;
        }
        
        if (secrets.some(s => s.url)) {
            const secretUrl = secrets.find(s => s.url)?.url;
            if (secretUrl?.startsWith("/")) {
                window.location.href = secretUrl;
                return;
            }
            window.open(secretUrl, "_blank");
        }
        
        if (secrets.some(s => s.action)) {
            const secretActions = secrets.filter(s => s.action);

            secretActions.forEach(secret => {
                switch (secret.action) {
                    case "message":
                        alert(secret.data);
                        break;
                    case "setTheme":
                        ThemeManager.theme = secret.data || "theme-light";
                        break;
                }
            });
        }
    }
}