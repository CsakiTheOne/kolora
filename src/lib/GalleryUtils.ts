export default class GalleryUtils {

    static get workId(): string | null {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (id) {
            this.workId = id;
            return id;
        }

        const storedId = sessionStorage.getItem("workId");
        if (storedId) return storedId;

        return null;
    }

    static set workId(id: string | null) {
        if (!id) {
            sessionStorage.removeItem("workId");
            return;
        }

        sessionStorage.setItem("workId", id);
    }

}