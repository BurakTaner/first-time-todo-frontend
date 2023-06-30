import { Writable, writable } from "svelte/store";
import type User from "../interfaces/User";

const result = localStorage.getItem("user");
export const userStore: Writable<User| null> = writable(result ? JSON.parse(result) : null );
