/**
 * A POI is a real-world location that can be visited by users.
 * At each location, users can find an NFC tag that they can scan to open its page in the app.
 */
export default class POI {
    id: string = '';
    name: string = '';
    description: string = '';
    googleMapsLink: string = '';
    latitude: number = 0;
    longitude: number = 0;
    allowPosting: boolean = false;
}