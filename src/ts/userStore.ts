import { writable } from "svelte/store";

const result = localStorage.getItem("user");
export const userStore = writable(result ? JSON.parse(result) : null );
