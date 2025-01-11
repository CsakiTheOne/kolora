export default class KoloraUser {
    id: string = '';
    username: string = '';
    bio: string = '';
    favoriteMusicYoutubeUrl: string = '';
    // E.g. "Spotify", "YouTube Music", etc. Used for the random music feature
    preferredMusicService: string = '';
    roles: string[] = [];
}

const ROLES = {
    ADMIN: 'admin',
    KOLORA_MEMBER: 'kolora_member',
}

export { ROLES };