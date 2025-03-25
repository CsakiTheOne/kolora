export type ReportContentType = "post" | "user" | "work";

export default class Report {
    id: string = "";
    userId: string = "";
    contentType: ReportContentType = "post";
    contentId: string = "";
    reason: string = "";
    createdAt: string = new Date().toLocaleDateString("hu-HU");
}