export function recordEvent(eventName: string, eventParams: Record<string, any>) {
    window.gtag("event", eventName, eventParams);
}