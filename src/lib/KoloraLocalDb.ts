import ThemeManager from "./ThemeManager";

export default class KoloraLocalDb {
    static bandSongs = [
        // The Jex
        'https://youtu.be/aNlgE6vcbiI?si=F8zA4cdpKtEeYhYJ',
        'https://youtu.be/5F-3pPWINsM?si=tTqJ7CnOBIh-HwCQ',
        // Loophia
        'https://youtu.be/wPRzs-mLwQk?si=bAETfHu-F6keD3w_',
        'https://youtu.be/AvqETiAWtD8?si=UM5mchuEgeio_1_D',
        'https://youtu.be/hQgdI4shsOI?si=ADujifbKgXxp81G9',
        // Næz
        'https://youtu.be/Z4HPjjrMgno?si=1PwDwBZaaWyPdVa5',
        'https://youtu.be/huscK-IdVpU?si=8yCj4So1uXwISXsl',
        'https://youtu.be/cTKLLtIT80k?si=CohC9hXgwwKOfJRF',
        'https://youtu.be/bPYI48u_9YI?si=SZQCpiHFnbQDJiRt',
        'https://youtu.be/m0Y673xxvzQ?si=1QZAB9sTvMDhrAlJ',
        'https://youtu.be/znyVyI8eeVE?si=rw_kIX_nlyJgfU7L',
        'https://youtu.be/tmUzz82wAZ0?si=Pw9cVeSuMqGnPJAF',
        'https://youtu.be/8Mju0CCZemA?si=jbeJeekI-67Uz39f',
        // Nedel'a
        'https://youtu.be/kDXxczfc9ik?si=klf2zb7hHnnK0u-X',
        'https://youtu.be/uWwkJXTX5rk?si=2Po9ujGyQGMAuhmz',
        // Waiting Room
        'https://youtu.be/sk3WEAAOMls?si=ytBouSl9JlU94J09',
        'https://youtu.be/UW_gjiilXYQ?si=xYs1G5uXYszWQu4h',
        'https://youtu.be/6__DN31kaXE?si=0mwuskw-t7Vz4p7O',
        'https://youtu.be/G7CLtL6yLyM?si=rtAGrHIr6_exzqu7',
        'https://youtu.be/iHcrnqhpH-c?si=l_XSpyP0VZG2ekVv',
        'https://youtu.be/LMMUJI9eyrg?si=HDerWSI5gb3VuzEY',
        'https://youtu.be/NMajHHufk54?si=hs8Y9CwjxSOcsyg-',
        'https://youtu.be/_F-gC_YQ3v8?si=6YQh8l04Ge6qmkGW',
        'https://youtu.be/ktqHOTsD2m8?si=Dq_XZ2JrVBmnwkGZ',
    ];

    static secrets = [
        {
            code: '230621',
            action: 'setTheme',
            data: 'theme-retro',
        },
        {
            code: '230621',
            action: 'message',
            data: 'Gratula! Ne mondd el senkinek a kódot vagy, hogy hogyan találtad meg! :D',
        },
        {
            code: 'ny8lcas.sl24m',
            url: 'https://youtu.be/-9d2Bm0v4dk',
        },
        {
            code: 'mse',
            url: 'https://www.youtube.com/watch?v=CLzMPM1anl4&t=1s&pp=ygUQb3JpYXNpIGtpc2VnZXLFsQ%3D%3D',
        },
        {
            code: 'pultos',
            url: '/timeline/kispiros',
        },
        {
            code: 'slamjam250411',
            url: '/gallery',
        },
    ];

    static tryCode(code: string) {
        const secrets = KoloraLocalDb.secrets.filter(s => s.code === code);

        if (!secrets) {
            return null;
        }

        if (secrets.some(s => s.url)) {
            const secretUrl = secrets.find(s => s.url)?.url;
            if (secretUrl?.startsWith('/')) {
                window.location.href = secretUrl;
                return;
            }
            window.open(secretUrl, '_blank');
        }

        if (secrets.some(s => s.action)) {
            const secretActions = secrets.filter(s => s.action);

            secretActions.forEach(secret => {
                switch (secret.action) {
                    case 'message':
                        alert(secret.data);
                        break;
                    case 'setTheme':
                        ThemeManager.theme = secret.data || 'theme-light';
                        break;
                }
            });
        }
    }
}