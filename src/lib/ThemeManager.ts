import { browser } from "$app/environment";

export default class ThemeManager {

    /**
     * Each theme has a corresponding CSS class that is added to the body element.
     * See src/app.css for the CSS rules.
     */
    static themes = ["theme-system", "theme-light", "theme-dark", "theme-retro"];
    static themeColors = ["color-blue", "color-purple", "color-yellow"];

    static init() {
        if (browser) {
            document.body.classList.remove(...this.themes);
            document.body.classList.add(this.theme);
            document.body.classList.remove(...this.themeColors);
            document.body.classList.add(this.color);
            document.head.querySelector("meta[name=theme-color]")?.setAttribute("content", this.getThemeColor("--primary-color"));
        }
    }

    /**
     * Get the HEX color value of a CSS variable.
     * @param cssVariableName Example: "--primary-color"
     * @returns HEX color value of the CSS variable
     */
    static getThemeColor(cssVariableName: string, context?: HTMLElement): string {
        return getComputedStyle(context || document.body).getPropertyValue(cssVariableName);
    }

    static get theme() {
        return localStorage.getItem("theme") || "theme-light";
    }
    static set theme(value) {
        if (!this.themes.includes(value)) {
            throw new Error("Invalid theme");
        }
        localStorage.setItem("theme", value);
        if (browser) {
            document.body.classList.remove(...this.themes);
            document.body.classList.add(value);
            document.head.querySelector("meta[name=theme-color]")?.setAttribute("content", this.getThemeColor("--primary-color"));
        }
    }

    static get color() {
        return localStorage.getItem("color") || "color-default";
    }
    static set color(value) {
        if (!this.themeColors.includes(value)) {
            localStorage.removeItem("color");
        }
        localStorage.setItem("color", value);
        if (browser) {
            document.body.classList.remove(...this.themeColors);
            document.body.classList.add(value);
        }
    }

    static toggleDarkLight() {
        this.theme = this.theme === "theme-dark" ? "theme-light" : "theme-dark";
    }

}