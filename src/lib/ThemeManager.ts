import { browser } from "$app/environment";

export default class ThemeManager {

    static themes = ['theme-light', 'theme-dark', 'theme-retro'];

    static init() {
        document.body.classList.add(this.theme);
    }

    static get theme() {
        return localStorage.getItem('theme') || 'light';
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

    static toggle() {
        this.theme = this.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    }

}