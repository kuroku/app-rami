import { writable, get } from 'svelte/store';
import type { User } from './type/user';
import type { Theme } from '$lib/mdl-ui/components/Material.svelte';

export const userSession = writable<User>();

export const theme = writable<Theme['type']>('light');

export const changeTheme = () => {
	if (get(theme) === 'light') {
		theme.set('dark');
	} else {
		theme.set('light');
	}
};
