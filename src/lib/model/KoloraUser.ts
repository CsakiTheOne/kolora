export default class KoloraUser {
    id: string = '';
    username: string = '';
    bio: string = '';
    favoriteMusicYoutubeUrl: string = '';
    roles: string[] = [];
}

const ROLES = {
    ADMIN: 'admin',
    KOLORA_MEMBER: 'kolora_member',
}

export { ROLES };