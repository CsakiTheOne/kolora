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
            name: "Crescendo Selecta",
            bannerImageUrl: imgMusicianCrescendoSelecta,
            websiteUrl: "https://www.facebook.com/p/Crescendo-Selecta-100071517142995",
            songUrls: [
                "https://youtu.be/w9TdMc5JArg?si=kXoW1bthuNWLxity",
                "https://youtu.be/5yLHwi9SUG8?si=4I92h6tqNfVapmZn",
                "https://youtu.be/38ieD9Yw7D0?si=3OFwjFG3KOHlTIEw",
                "https://youtu.be/VYjkM6x83i8?si=u6p6t3WpMJFuaYCH",
                "https://youtu.be/_11KrFa0BJk?si=6lC3Nw9DcjIr5hgp",
                "https://youtu.be/fkpM5sKncpI?si=_pUA5sYISlZ0pXfh",
                "https://youtu.be/5dWEIst98RA?si=esmKxNaUgeEiuwoM",
                "https://youtu.be/jFrVdi_V6P0?si=gpQx-HXqIoCzQ-YN",
                "https://youtu.be/IY-gNXCXd-s?si=9tdY9wMxAG51bvRT",
                "https://youtu.be/XXBmyp9fafo?si=h_269yR_zl4IhbrY",
                "https://youtu.be/7kX4uoOMLHw?si=83V6cLVyKiidPx3P",
                "https://youtu.be/INYW5-js7Ek?si=52NZOXEiiE6W3Vjg",
                "https://youtu.be/i5nyf-SZlXU?si=IcksJIjCGB9xZfTI",
                "https://youtu.be/uuJRAeQ7cwM?si=W7Mz7mvq_OIGI96i",
                "https://youtu.be/UAWBkT1z2KY?si=uNy0SmHlDsseZAs_",
                "https://youtu.be/eJWjwFOz5r4?si=yQx71WlJGFiFW-oA",
                "https://youtu.be/TYxq9MxAz08?si=KIvPAkZ1XgNBPKJL",
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

    static secrets = [
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
            code: "jam250411",
            url: "/gallery",
        },
        {
            code: "ny8lcas.sl24m",
            url: "https://youtu.be/-9d2Bm0v4dk",
        },
        {
            code: "pirospultos",
            url: "https://photos.app.goo.gl/MsuistyMjtUpRCu16",
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