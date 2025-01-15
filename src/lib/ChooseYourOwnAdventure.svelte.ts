import type Work from "./model/Work";

export default class ChooseYourOwnAdventure {
    pages: ChooseYourOwnAdventurePage[] = [];
    variables: { [key: string]: string } = {};

    constructor(work: Work) {
        const rawPages = work.content.split("## ").slice(1);

        this.pages = rawPages.map((rawPage) => {
            const [title, ...rawContentArray] = rawPage.split("\n\n");
            const rawContent = rawContentArray.join("\n\n");
            const content = rawContent
                .replace(/\[.*?\]\(#.*?\)/g, "") // Remove markdown links
                .replace(/\n\/.*/g, "") // Remove markdown comments
                .replace(/\r/g, "")
                .replace(/\\\n+/g, "\n")
                .trim()
                .replace(/\n/g, "<br />")
                .replace(/{\{(\w+)\}\}/g, (match, variable) => this.variables[variable] || match);
            const links = rawContent.match(/\[.*\]\(#.*\)/g)?.map((link) => {
                const condition = link.includes(" ? ") ? link.split(" ? ")[0].slice(1) : "1 == 1";
                const text = link.slice(link.indexOf("? "), link.indexOf("]")).slice(1).trim() || link.slice(1, link.indexOf("]"));
                const page = link.slice(link.indexOf("#"), link.lastIndexOf(")"));
                return new ChooseYourOwnAdventureLink(text, page, new InteractivePoemCondition(condition));
            }) || [];
            const commands = rawContent.match(/\/.*/g) || [];

            return new ChooseYourOwnAdventurePage(title, content, links, commands);
        });
    }

    getPageByLink(link: ChooseYourOwnAdventureLink): ChooseYourOwnAdventurePage | undefined {
        const simplifiedLinkTarget = link.page.toLowerCase().replace(/\W*/g, "");
        const nextPage = this.pages.find((page) => {
            const simplifiedPageTitle = page.title.toLowerCase().replace(/\W*/g, "");
            return simplifiedPageTitle === simplifiedLinkTarget;
        });
        return nextPage;
    }

    runCommandsOnPage(page: ChooseYourOwnAdventurePage | undefined): void {
        page?.commands.forEach((command) => {
            const [baseCommand, ...args] = command.split(" ");
            switch (baseCommand) {
                case "/set":
                    const [variable, value] = args;
                    if (value === "null" || value === "0") {
                        delete this.variables[variable];
                    }
                    else {
                        this.variables[variable] = value;
                    }
                    console.log(`Set ${variable} to ${value}`);
                    break;
                case "/add":
                    const [variableToAddTo, valueToAdd] = args;
                    if (!this.variables[variableToAddTo]) {
                        this.variables[variableToAddTo] = valueToAdd;
                    }
                    else {
                        this.variables[variableToAddTo] = (parseInt(this.variables[variableToAddTo]) + parseInt(valueToAdd)).toString();
                    }
                    console.log(`Added ${valueToAdd} to ${variableToAddTo}. New value: ${this.variables[variableToAddTo]}`);
                    break;
                case "/subtract":
                    const [variableToSubtractFrom, valueToSubtract] = args;
                    if (!this.variables[variableToSubtractFrom]) {
                        this.variables[variableToSubtractFrom] = "" + (-valueToSubtract);
                    }
                    else {
                        this.variables[variableToSubtractFrom] = (parseInt(this.variables[variableToSubtractFrom]) - parseInt(valueToSubtract)).toString();
                    }
                    console.log(`Subtracted ${valueToSubtract} from ${variableToSubtractFrom}. New value: ${this.variables[variableToSubtractFrom]}`);
                    break;
                case "/clear":
                    const variableToClear = args[0];
                    delete this.variables[variableToClear];
                    console.log(`Cleared ${variableToClear}`);
                    break;
                default:
                    console.error(`Unknown command: ${baseCommand}`);
                    break;
            }
        });
    }
}

export class ChooseYourOwnAdventurePage {
    title: string;
    content: string;
    links: ChooseYourOwnAdventureLink[];
    commands: string[];

    constructor(title: string, content: string, links: ChooseYourOwnAdventureLink[] = [], commands: string[] = []) {
        this.title = title;
        this.content = content;
        this.links = links;
        this.commands = commands;
    }

    getProcessedContent(poem: ChooseYourOwnAdventure): string {
        return this.content
            .replace(/(?<!\\){(\w+)}/g, (match, variable) => poem.variables[variable] || "0")
            .replace(/\\{/g, "{");
    }
}

class ChooseYourOwnAdventureLink {
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

    constructor(conditionText: string = "1 == 1") {
        const [value1, operator, value2] = conditionText.split(" ");
        this.value1 = value1;
        this.operator = operator;
        this.value2 = value2;
    }

    evaluate(poem: ChooseYourOwnAdventure): boolean {
        const value1 = this.value1.startsWith("{") ? poem.variables[this.value1.slice(1, -1)] : this.value1;
        const value2 = this.value2.startsWith("{") ? poem.variables[this.value2.slice(1, -1)] : this.value2;

        switch (this.operator) {
            case "==":
                return value1 === value2;
            case "!=":
                return value1 !== value2;
            case ">":
                return value1 > value2;
            case "<":
                return value1 < value2;
            case ">=":
                return value1 >= value2;
            case "<=":
                return value1 <= value2;
            default:
                return false;
        }
    }
}