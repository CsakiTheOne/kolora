import type Work from "./model/Work";

export default class InteractivePoem {
    pages: InteractivePoemPage[] = [];
    variables: { [key: string]: string } = {};

    constructor(work: Work) {
        const rawPages = work.content.split("## ").slice(1);

        this.pages = rawPages.map((rawPage) => {
            const [title, ...rawContentArray] = rawPage.split("\n\n");
            const content = rawContentArray
                .join("\n\n")
                .replace(/\[.*?\]\(#.*?\)/g, "") // Remove markdown links
                .replace(/\n\/.*/g, "") // Remove markdown comments
                .replace(/\r/g, "")
                .replace(/\n> /g, "\n") // Remove markdown blockquotes
                .replace(/\\\n+/g, "\n")
                .trim()
                .replace(/\n/g, "<br />")
                .replace(/{\{(\w+)\}\}/g, (match, variable) => this.variables[variable] || match);
            const links = content.match(/\[.*?\]\(#.*?\)/g)?.map((link) => {
                const [text, page] = link.slice(1, -1).split("](");
                return new InteractivePoemLink(text, page);
            }) || [];

            return new InteractivePoemPage(title, content, links);
        });
    }
}

class InteractivePoemPage {
    title: string;
    content: string;
    links: InteractivePoemLink[];
    commands: string[];

    constructor(title: string, content: string, links: InteractivePoemLink[] = [], commands: string[] = []) {
        this.title = title;
        this.content = content;
        this.links = links;
        this.commands = commands;
    }
}

class InteractivePoemLink {
    text: string;
    page: string;
    condition: InteractivePoemCondition = InteractivePoemCondition.alwaysTrue;

    constructor(text: string, page: string, condition: InteractivePoemCondition = InteractivePoemCondition.alwaysTrue) {
        this.text = text;
        this.page = page;
        this.condition = condition;
    }
}

class InteractivePoemCondition {
    static alwaysTrue = new InteractivePoemCondition("1 == 1");

    value1: string;
    operator: string;
    value2: string;

    constructor(conditionText: string) {
        const [value1, operator, value2] = conditionText.split(" ");
        this.value1 = value1;
        this.operator = operator;
        this.value2 = value2;
    }

    evaluate(): boolean {
        switch (this.operator) {
            case "==":
                return this.value1 === this.value2;
            case "!=":
                return this.value1 !== this.value2;
            case ">":
                return this.value1 > this.value2;
            case "<":
                return this.value1 < this.value2;
            case ">=":
                return this.value1 >= this.value2;
            case "<=":
                return this.value1 <= this.value2;
            default:
                return false;
        }
    }
}