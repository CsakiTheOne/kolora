export default class PoiUtils {
    /**
     * The maximum distance in meters from the sticker to view the poi page.
     * If the user goes out of this distance, the poi page will be closed.
     */
    static DISTANCE_TO_VIEW = 160;
    /**
     * The maximum distance in meters from the sticker to open the poi page from the feeds page.
     * If the user goes out of this distance, the poi page can still be viewed, but not opened with a button.
     */
    static DISTANCE_TO_OPEN = 50;
    static POST_CONTENT_LENGTH_LIMIT = 2000;

    /**
     * Measure the distance between two points on the earth (specified in decimal degrees)
     * This function uses the Haversine formula to calculate the distance between two points on the earth's surface.
     * @param lat1 
     * @param lon1 
     * @param lat2 
     * @param lon2 
     * @returns The distance between the two points in meters.
     * @see https://en.wikipedia.org/wiki/Haversine_formula
     */
    static measureDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const R = 6371e3; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ in radians (latitude)
        const φ2 = (lat2 * Math.PI) / 180; // φ in radians (latitude)
        const Δφ = ((lat2 - lat1) * Math.PI) / 180; // difference in latitude in radians
        const Δλ = ((lon2 - lon1) * Math.PI) / 180; // difference in longitude in radians

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) *
            Math.cos(φ2) *
            Math.sin(Δλ / 2) *
            Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(R * c); // in metres
    }
}