import { browser } from "$app/environment";

export default class ThemeManager {

    /**
     * Each theme has a corresponding CSS class that is added to the body element.
     * See src/app.css for the CSS rules.
     */
    static themes = ['theme-light', 'theme-dark', 'theme-retro'];

    static init() {
        if (browser) {
            document.body.classList.remove(...this.themes);
            document.body.classList.add(this.theme);
        }
    }

    static get theme() {
        return localStorage.getItem('theme') || 'theme-light';
    }

    static set theme(value) {
        if (!this.themes.includes(value)) {
            throw new Error('Invalid theme');
        }
        localStorage.setItem('theme', value);
        if (browser) {
            document.body.classList.remove(...this.themes);
            document.body.classList.add(value);
        }
    }

    static toggleDarkLight() {
        this.theme = this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    }

}