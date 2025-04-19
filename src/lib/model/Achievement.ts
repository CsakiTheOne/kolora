export default class Achievement {
    id: string = "";
    icon: string = "star";
    name: string = "";
    description: string = "";
    parentId: string | null = null;
    predicate: (visitedPlaces: string[]) => boolean = () => false;
}

const achievements: Achievement[] = [
    {
        id: "visit_poi_1",
        name: "Kirándulás",
        description: "Találj egy üzenőfalat",
        predicate: (visitedPlaces: string[]) => visitedPlaces.length > 0,
    },
    {
        id: "visit_poi_2",
        icon: "directions",
        name: "Inga",
        description: "Látogass meg két üzenőfalat",
        parentId: "visit_poi_1",
        predicate: (visitedPlaces: string[]) => visitedPlaces.length > 1,
    },
    {
        id: "visit_poi_3",
        icon: "directions-fork",
        name: "Kincskereső",
        description: "Látogass meg három üzenőfalat",
        parentId: "visit_poi_2",
        predicate: (visitedPlaces: string[]) => visitedPlaces.length > 2,
    },
    {
        id: "visit_poi_4",
        icon: "sign-direction",
        name: "A falu végén is túl",
        description: "Látogass meg négy üzenőfalat",
        parentId: "visit_poi_3",
        predicate: (visitedPlaces: string[]) => visitedPlaces.length > 3,
    },
    {
        id: "visit_poi_5",
        icon: "map",
        name: "Világjáró",
        description: "Látogass meg öt üzenőfalat",
        parentId: "visit_poi_4",
        predicate: (visitedPlaces: string[]) => visitedPlaces.length > 4,
    },

    {
        id: "post_1",
        icon: "pencil",
        name: "Posztolj verset!",
        description: "Tedd ki az első posztod egy üzenőfalra",
        parentId: "visit_poi_1",
    },
    {
        id: "post_2",
        icon: "pencil",
        name: "Itt és ott",
        description: "Posztolj két különböző helyre",
        parentId: "post_1",
    }
].map(acObj => {
    return { ...new Achievement(), ...acObj };
});

export { achievements };