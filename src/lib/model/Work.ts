export default class Work {
    id: string = "";
    authorId: string = "";
    title: string = "";
    description: string = "";
    /**
     * The type of work. This is not the same as genre. This only determines how the work is displayed.
     */
    workType: string = "Írott mű";
    genre: string = "";
    content: string = "";
    dateCreated: string = "";
    tags: string[] = [];
}

const WORK_TYPES = {
    CYOA: {
        label: "Choose your own adventure",
        description: "Choose your own adventure (interaktív történet)",
    },
    WRITTERN: {
        label: "Írott mű",
        description: "Írott mű (regény, vers, novella, stb.)",
    },
    NON_WRITTEN: {
        label: "Nem írott mű",
        description: "Nem írott mű (rajz, slam, zene, stb.)",
    },
}

export { WORK_TYPES };