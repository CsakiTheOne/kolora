import type KoloraUser from "./KoloraUser";

export default class Achievement {
    id: string = "";
    icon: string = "star";
    name: string = "";
    description: string = "";
    parentId: string | null = null;
    predicate: (user: KoloraUser) => boolean = () => false;
    rewards: string[] = [];
}

const achievements: Achievement[] = [
    {
        id: "visit_poi_1",
        name: "Kirándulás",
        description: "Találj egy üzenőfalat",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 1,
        rewards: ["profile.bio.edit"],
    },
    {
        id: "visit_poi_2",
        icon: "directions",
        name: "Inga",
        description: "Látogass meg két üzenőfalat",
        parentId: "visit_poi_1",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 2,
    },
    {
        id: "visit_poi_3",
        icon: "directions-fork",
        name: "A harmadik hely",
        description: "Látogass meg három üzenőfalat",
        parentId: "visit_poi_2",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 3,
    },
    {
        id: "visit_poi_4",
        icon: "sign-direction",
        name: "A falu végén is túl",
        description: "Látogass meg négy üzenőfalat",
        parentId: "visit_poi_3",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 4,
    },
    {
        id: "visit_poi_5",
        icon: "map",
        name: "Kincskereső",
        description: "Látogass meg öt üzenőfalat",
        parentId: "visit_poi_4",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 5,
    },
    {
        id: "visit_poi_6",
        icon: "map",
        name: "Világjáró",
        description: "Látogass meg hat üzenőfalat",
        parentId: "visit_poi_5",
        predicate: (user: KoloraUser) => user.visitedPlaces.length >= 6,
    },
].map(acObj => {
    return { ...new Achievement(), ...acObj };
});

export function getRewardsByUser(user: KoloraUser): string[] {
    return achievements
        .filter(achievement => achievement.predicate({...user}))
        .map(achievement => achievement.rewards)
        .flat();
}

export { achievements };