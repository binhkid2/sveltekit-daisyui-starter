import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string ;

    try {
        await locals.pb
        .collection('users')
        .authWithPassword(email,password)
        if (!locals.pb?.authStore?.model?.verified) {
          locals.pb.authStore.clear();
          return {
            notVerified: true
          };
        }
    } catch (e) {
      console.error(e)
      throw e
    }

    throw redirect(303, '/')
  },
}

