export default class KoloraEvent {
    id: string = '';
    title: string = '';
    dateStart: string = '';
    dateEnd: string = '';
    url: string = '';
    /** If this is true, the event is visible in the online work editor. */
    allowWorkLinking: boolean = false;
}