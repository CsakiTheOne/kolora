import ThemeManager from "./ThemeManager";
import imgMusicianBodonyiDani from "$lib/images/musicians/bodonyi-dani-banner.jpg";
import imgMusicianCrescendoSelecta from "$lib/images/musicians/crescendo-selecta-banner.jpg";
import imgMusicianEgy5Egy from "$lib/images/musicians/egy5egy-banner.jpg";
import imgMusicianFarkasMarton from "$lib/images/musicians/farkas-marton.jpg";
import imgMusicianFeltucat from "$lib/images/musicians/feltucat-banner.jpg";
import imgMusicianJex from "$lib/images/musicians/jex-banner.png";
import imgMusicianKalafaticsImre from "$lib/images/musicians/kalafatics-imre.png";
import imgMusicianKam from "$lib/images/musicians/kam.jpg";
import imgMusicianKory from "$lib/images/musicians/kory.jpg";
import imgMusicianLoophia from "$lib/images/musicians/loophia-banner.jpg";
import imgMusicianNaez from "$lib/images/musicians/naez-logo.jpg";
import imgMusicianNedela from "$lib/images/musicians/nedela-banner.jpg";
import imgMusicianSzer from "$lib/images/musicians/szer-banner.jpg";
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
            name: "Farkas Márton",
            bannerImageUrl: imgMusicianFarkasMarton,
            websiteUrl: "https://www.instagram.com/markasfarci/",
        },
        {
            name: "Féltucat",
            bannerImageUrl: imgMusicianFeltucat,
            websiteUrl: "https://www.instagram.com/_feltucat/",
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
            name: "KAM",
            bannerImageUrl: imgMusicianKam,
            websiteUrl: "https://www.instagram.com/here.i.kam._",
            songUrls: [
                "https://youtu.be/SjhUrbH7Smw?si=tps6QZEg0pBj0eKi",
                "https://youtu.be/LyLAv5muR4Y?si=9m5I5En5CVjL7-TA",
                "https://youtu.be/81Ro_B_HSmk?si=zzBIqbQXRaDY_7ub",
                "https://youtu.be/ofFus_iSGuQ?si=L9gQ83zssT3iqpgT",
                "https://youtu.be/WrAPhuqWyg8?si=HzO3VEK2VB51i3NR",
            ],
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
            name: "Porszem",
            websiteUrl: "https://www.instagram.com/porszemband/",
        },
        {
            name: "Somnium",
            websiteUrl: "https://www.instagram.com/somniumzenekar/",
        },
        {
            name: "SZER",
            bannerImageUrl: imgMusicianSzer,
            websiteUrl: "https://www.instagram.com/szer_zenekar/",
        },
        {
            name: "Tearaža",
            websiteUrl: "https://www.instagram.com/tearaza_band/",
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
        {
            name: "Wake And Bake",
        },
    ];

    static slamPerformances = [
        // 2025 Február Műhely Slam Nyolcas Műhely
        "https://youtu.be/FtIpUYlfJKY?si=2VtyR9msuPU8Pn1d",
        "https://youtu.be/LDvjOufPE84?si=R09d-12yGVVv0Tp3",
        "https://youtu.be/MNb0AUxl7Fs?si=kWhs5mkj_bmMpaIA",
        "https://youtu.be/ELrmeWBWcI4?si=ICLcBydnGayxUom_",
        "https://youtu.be/McdTUenZR1w?si=JnvGgfdXKvqv5FFL",
        "https://youtu.be/QRDYdXHfNkU?si=v0OzddBuZgLBUiu3",
        "https://youtu.be/3DRqgYkYYTI?si=I5RslX6acO5CVmHN",
        "https://youtu.be/RUCuNSesVxo?si=NY62AdQZXtiSpDvV",
        "https://youtu.be/CVMR1Ns6mVo?si=1mYuQIXOVIFBv98z",
        "https://youtu.be/OB28TmtILCU?si=MnvL4DYS8yuuBKWv",
        "https://youtu.be/XF2vLInd2DE?si=SsoFV26pijXmz9j_",
        "https://youtu.be/yFsc9jc5oyM?si=YM_k13Bf4pBAzkbV",
        "https://youtu.be/uj6J6CTQ8w0?si=jVOcl3I9xRNwf1OK",
        "https://youtu.be/Y1yv8R_gUhU?si=mf7q6gVGUJQatY-3",
        "https://youtu.be/trdUfjSaq3s?si=-6UhHt4iSJJNAqdZ",
        "https://youtu.be/bg41RvYe-Kg?si=vX9DSBUM0HysTfba",
        "https://youtu.be/VzBnI7WK0IQ?si=GIoxxHNFUJdHPP4i",
        // 2024 Múzeumok Éjszakája, Kolora szülinap Museum Café
        "https://youtu.be/BZQ1aQPS0Mg?si=Rcvqex13gzUEZHAG",
        "https://youtu.be/Ci5bbIYCf6g?si=tcppR13M1_Af4pWL",
        "https://youtu.be/15cLjJL0vBg?si=5DqokfS_6jxLpDzU",
        "https://youtu.be/9jc-EY495LI?si=Zupgx2xx4fVtscRM",
        "https://youtu.be/AsW0ZbUgRnc?si=A3RZ-RnSmuORhNY5",
        "https://youtu.be/G0oCicrkzlw?si=jlkGgMobrPt1ixSZ",
        "https://youtu.be/GY7tzpPJhCE?si=I2HGiLj2Qs2mDofI",
        "https://youtu.be/QuS91GwFEZM?si=hB7tOxy6NO1qCpBt",
        "https://youtu.be/oz1-jiha9SE?si=uZY-kiGK_25ce0W7",
        "https://youtu.be/lk5oQYBIJUY?si=zl44oqInS6KQnC3i",
        "https://youtu.be/xMxpKtIG-fM?si=0iEdjz30263sRPyw",
        "https://youtu.be/eI8yjLWYUhM?si=U9uAej4o7PBHDVEC",
        "https://youtu.be/w5A9yV1Yetg?si=y2iWO7ZuGKKGgWyb",
        "https://youtu.be/zW6tmRJhHps?si=XDCS7XHCqgBH3V9A",
        // 2024 Március Nyolcas Műhely
        "https://youtu.be/DVx2HsId8rI?si=W41iJEYXNxd_eZys",
        "https://youtu.be/YDPWEvkFKt8?si=R9eGjSyiz_7SnBwN",
        "https://youtu.be/Qopn1sdCuHU?si=uW9C9U3tbFzJ8MUQ",
        "https://youtu.be/ASwpwOg2G3k?si=jJcHvd5QoQxxY1Oc",
        "https://youtu.be/-3a8Zn4BeRM?si=eBxXrblz-yih6gN2",
        "https://youtu.be/eBVL2k8MXOA?si=cYOmn-LbycSyakZD",
        "https://youtu.be/Cz1c4XqqPbM?si=0JyZxlsWOckIzG-k",
        "https://youtu.be/GVbr1KSwY18?si=sJjClFEmML_KJu3b",
        "https://youtu.be/kvhady0sG9M?si=p0AbNZ69i0oiO_Sz",
        "https://youtu.be/zvkljKMheS8?si=VfJjDufmUQPqelh7",
        "https://youtu.be/dtejv1OxfwI?si=aS3h6xLafmAW0uwr",
        "https://youtu.be/GJ5wr3Ew4Cc?si=lqPPppVzfTkzfChc",
        "https://youtu.be/LDK3UhkoCCs?si=96F5ddJ3GpbntJ3r",
        "https://youtu.be/ryBgTxUiy_4?si=V4EAMxaHPbQhHm_x",
        "https://youtu.be/I06FKVCl6Wg?si=Ia7o5AV4YSLJJFhy",
        "https://youtu.be/KrwK19womvg?si=x6ZnzpfvWWfpWv36",
        "https://youtu.be/mVvyinN9Rqk?si=aQFxWeox8f172ALO",
        "https://youtu.be/rVnkmKtdfTA?si=8ymnTcg5i_Rc2z7_",
        // 2023 Akusztikus est Museum Café
        "https://youtu.be/zbqaZEAduWE?si=OioILB35rf1aNQ9O&t=1155",
        "https://youtu.be/zbqaZEAduWE?si=_lFHMqPQQ9vr3TzP&t=1055",
        "https://youtu.be/zbqaZEAduWE?si=CNwCAisVuA5DtoWe&t=858",
        "https://youtu.be/zbqaZEAduWE?si=8sD-uyp0Jhibi7-F&t=634",
        "https://youtu.be/zbqaZEAduWE?si=4jZp4l62Il-BWrLM&t=458",
        "https://youtu.be/zbqaZEAduWE?si=mrOpZGL2tEgy8SDm&t=266",
        "https://youtu.be/zbqaZEAduWE?si=yVFPgJKt2_X0FDQp&t=169",
        "https://youtu.be/zbqaZEAduWE?si=JnHGjqMOnf3UYeTF",
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