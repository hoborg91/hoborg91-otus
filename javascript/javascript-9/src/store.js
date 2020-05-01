import { writable, } from 'svelte/store';

export const entries = writable([]);

export const add = (entry) => {
    entries.update(es => [...es, entry]);
};

export const remove = (entry) => {
    entries.update(es => es.filter(e => e !== entry));
}