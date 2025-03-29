export default class KoloraUser {
    id: string = '';
    username: string = '';
    bio: string = '';
    createdAt: string = '';
    roles: string[] = [];
    isBanned: boolean = false;
    visitedPlaces: string[] = [];
}

const ROLES = {
    ADMIN: 'admin',
    EARLY_TESTER: 'early_tester',
    KOLORA_MEMBER: 'kolora_member',
}

export { ROLES };