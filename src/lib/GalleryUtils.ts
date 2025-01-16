export default class GalleryUtils {

    static get workId(): string | null {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        return id;
    }

}