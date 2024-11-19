export type SlamJamState = 'none' | 'upcoming' | 'writing' | 'voting';

export class SlamJamEvent {
    title: string;
    descriptionHTML: string;
    startDateTime: Date;
    votingDateTime: Date;
    endDateTime: Date;
    theme: string = '';

    constructor(
        title: string,
        descriptionHTML: string = '',
        startDateTime: Date,
        votingDateTime: Date,
        endDateTime: Date,
        theme: string = '',
    ) {
        this.title = title;
        this.descriptionHTML = descriptionHTML;
        this.startDateTime = startDateTime;
        this.votingDateTime = votingDateTime;
        this.endDateTime = endDateTime;
        this.theme = theme;
    }

    get state(): SlamJamState {
        const now = new Date();
        if (now < this.startDateTime) return 'upcoming';
        if (now < this.votingDateTime) return 'writing';
        if (now < this.endDateTime) return 'voting';
        return 'none';
    }

    get relevantDateTime(): Date {
        return {
            upcoming: this.startDateTime,
            writing: this.votingDateTime,
            voting: this.endDateTime,
            none: this.startDateTime,
        }[this.state];
    }
}


export default class SlamJamConfig {
    static events: SlamJamEvent[] = [
        /*new SlamJamEvent(
            'Teszt jam',
            '',
            new Date(2024, 10, 5, 9, 53),
            new Date(2024, 10, 5, 9, 55),
            new Date(2024, 10, 5, 10, 10),
            'Oda-vissza'
        ),*/
        new SlamJamEvent(
            '???',
            '',
            new Date(2025, 3, 11, 0, 0),
            new Date(2025, 3, 15, 0, 0),
            new Date(2025, 3, 21, 0, 0),
            'Oda-vissza'
        ),
    ];

    static get currentEvent(): SlamJamEvent | undefined {
        const now = new Date();
        const foundEvent = this.events.find(event => event.endDateTime > now);
        return foundEvent;
    }
}