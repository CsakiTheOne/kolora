export default class PoiUtils {
    /**
     * The maximum distance from the sticker to view the poi page.
     * If the user goes out of this distance, the poi page will be closed.
     */
    static DISTANCE_TO_VIEW = 0.004;
    /**
     * The maximum distance from the sticker to open the poi page from the feeds page.
     * If the user goes out of this distance, the poi page can still be viewed, but not opened with a button.
     */
    static DISTANCE_TO_OPEN = 0.001;
}