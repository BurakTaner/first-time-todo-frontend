import { Writable, writable } from "svelte/store";

export interface TodoStore {
  method:string;
  value: number;
}

export const todoModalStore:Writable<TodoStore|null> = writable(null);
