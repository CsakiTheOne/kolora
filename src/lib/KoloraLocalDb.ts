import ThemeManager from "./ThemeManager";

export default class KoloraLocalDb {
    static musicians = [
        {
            name: "egy5egy",
            bannerImageUrl: "https://scontent.fbud6-4.fna.fbcdn.net/v/t39.30808-6/443842683_974592858003892_3865728876528380810_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IrCYmdM8X7wQ7kNvgGMQMaN&_nc_zt=23&_nc_ht=scontent.fbud6-4.fna&_nc_gid=ALFjsaI2ZterBpoqEK0-bw0&oh=00_AYB7mAMo7MkBzfyUI9BBofGp01lrBvg5olBvgsergnYrhw&oe=67522990",
            websiteUrl: "https://www.facebook.com/egy5egyzenekar",
        },
        {
            name: "The JEX",
            bannerImageUrl: "https://ugc.production.linktr.ee/c636f8b7-b0dc-467f-b193-553aa8392781_DSC07364.jpeg?io=true&size=thumbnail-feature-v1_0",
            websiteUrl: "https://linktr.ee/thejexofficial",
            youtubeSongUrls: [
                "https://youtu.be/aNlgE6vcbiI?si=F8zA4cdpKtEeYhYJ",
                "https://youtu.be/5F-3pPWINsM?si=tTqJ7CnOBIh-HwCQ",
            ],
        },
        {
            name: "Loophia",
            bannerImageUrl: "https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/448202815_7694743990612810_7172244232801033659_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eOAn1PrGYJ0Q7kNvgEoV-wS&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=AG_Dl8w7NLs5QrIOZBB0vmv&oh=00_AYBZ7tvZartmTGRLWUim3Yq-jQHGoiahp75V681KKmjHlQ&oe=674F6D0F",
            websiteUrl: "https://linktr.ee/loophia",
            youtubeSongUrls: [
                "https://youtu.be/wPRzs-mLwQk?si=bAETfHu-F6keD3w_",
                "https://youtu.be/AvqETiAWtD8?si=UM5mchuEgeio_1_D",
                "https://youtu.be/hQgdI4shsOI?si=ADujifbKgXxp81G9",
            ],
        },
        {
            name: "Næz",
            bannerImageUrl: "https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/339993555_1867895933565984_1086912742086473449_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6O0KWI4wltIQ7kNvgGeuzr9&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=AKJvIywhPTxay71GK8nr1bQ&oh=00_AYCBkVg7LqfIEWoGVHUNwkjF6zmVikkjnkq6ism-yyyzJQ&oe=674F7F5B",
            websiteUrl: "https://linktr.ee/naez.official",
            youtubeSongUrls: [
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
            bannerImageUrl: "https://scontent.fbud7-3.fna.fbcdn.net/v/t39.30808-6/449056267_122152105730222063_647686779152558141_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Ldnc5FSPPiUQ7kNvgGoQtTr&_nc_zt=23&_nc_ht=scontent.fbud7-3.fna&_nc_gid=AwxgZD7bmo1ilJb2cK764Dt&oh=00_AYDybf9B_BkOnbtM_vTEDKMQ9zcqjXFljfaDDRA-VqVTyg&oe=674F5026",
            websiteUrl: "https://linktr.ee/nedela_zenekar",
            youtubeSongUrls: [
                "https://youtu.be/kDXxczfc9ik?si=klf2zb7hHnnK0u-X",
                "https://youtu.be/uWwkJXTX5rk?si=2Po9ujGyQGMAuhmz",
            ],
        },
        {
            name: "Waiting Room",
            bannerImageUrl: "https://scontent.fbud7-4.fna.fbcdn.net/v/t39.30808-6/466917919_543266368416392_5528035443175376377_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9tK1AWbsA6kQ7kNvgGMSRzg&_nc_zt=23&_nc_ht=scontent.fbud7-4.fna&_nc_gid=ACVMhlOpklW4E4iwmAiKwUc&oh=00_AYD-SF0rlLQQoY-sKiprG6RXdThwMBFZv48ntfP8psKFTQ&oe=674F9470",
            websiteUrl: "https://linktr.ee/waiting_room",
            youtubeSongUrls: [
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

    static secrets = [
        {
            code: "230621",
            action: "setTheme",
            data: "theme-retro",
        },
        {
            code: "230621",
            action: "message",
            data: "Gratula! Ne mondd el senkinek a kódot vagy, hogy hogyan találtad meg! :D",
        },
        {
            code: "ny8lcas.sl24m",
            url: "https://youtu.be/-9d2Bm0v4dk",
        },
        {
            code: "mse",
            url: "https://www.youtube.com/watch?v=CLzMPM1anl4&t=1s&pp=ygUQb3JpYXNpIGtpc2VnZXLFsQ%3D%3D",
        },
        {
            code: "pultos",
            url: "/timeline/kispiros",
        },
        {
            code: "slamjam250411",
            url: "/gallery",
        },
    ];

    static tryCode(code: string) {
        const secrets = KoloraLocalDb.secrets.filter(s => s.code === code);

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