export function recordEvent(eventName: string, eventParams: Record<string, any>) {
    const host = window.location.hostname;
    if (host === "localhost") {
        console.log("Analytics disabled on localhost", eventName, eventParams);
        return;
    }
    window.gtag("event", eventName, eventParams);
}