export type SlamJamState = 'none' | 'upcoming' | 'writing' | 'voting';

export class SlamJamEvent {
    title: string;
    description: string;
    startDateTime: Date;
    votingDateTime: Date;
    endDateTime: Date;
    theme: string = '';

    constructor(
        title: string,
        description: string = '',
        startDateTime: Date,
        votingDateTime: Date,
        endDateTime: Date,
        theme: string = '',
    ) {
        this.title = title;
        this.description = description;
        this.startDateTime = startDateTime;
        this.votingDateTime = votingDateTime;
        this.endDateTime = endDateTime;
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
        new SlamJamEvent(
            '???',
            '',
            new Date(2025, 3, 11, 0, 0),
            new Date(2025, 3, 15, 0, 0),
            new Date(2025, 3, 21, 0, 0),
        ),
    ];

    static get currentEvent(): SlamJamEvent | undefined {
        const now = new Date();
        return this.events.find(event => event.endDateTime > now);
    }
}