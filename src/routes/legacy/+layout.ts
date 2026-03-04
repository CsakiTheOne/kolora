export const prerender = true;
export const trailingSlash = 'always';

import ThemeManager from "$lib/ThemeManager";
import UserManager from "$lib/UserManager.svelte";
import { onMount } from "svelte";

ThemeManager.init();
