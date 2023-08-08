import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
			passwordConfirm: string;
		};

		try {
			await locals.pb.collection('users').create(data);

			try {
				await locals.pb.collection('users').requestVerification(data.email);
			} catch (e) {
				console.error(e);
			}
		} catch (e) {
			console.error(e);
			throw e;
		}

		throw redirect(303, '/login');
	}
};
