type WorkStatus = 'draft' | 'pending' | 'published';

export default class Work {
    id: string = '';
    authorId: string = '';
    title: string = '';
    description: string = '';
    /**
     * The type of work. This is not the same as genre. This only determines how the work is displayed.
     */
    workType: string = '';
    genre: string = '';
    content: string = '';
    dateCreated: string = '';
    dateUploaded: string = '';
    /**
     * The event that this work is associated with.
     */
    eventId: string = '';
    status: WorkStatus = 'draft';
    tags: string[] = [];
}