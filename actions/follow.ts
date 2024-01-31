'use server';

// Next Router
import { revalidatePath } from 'next/cache';

// server actions
import { followUser, unfollowUser } from '@/lib/follow-service';

export const onFollow = async (id: string) => {
	try {
		const userWeFollow = await followUser(id);

		revalidatePath('/'); // route that gets updated/ refreshed

		if (userWeFollow) {
			revalidatePath(`/${userWeFollow.following.username}`); // route that gets updated/ refreshed
		}

		return userWeFollow;
	} catch (error) {
		throw new Error('Internal error');
	}
};

export const unFollow = async (id: string) => {
	try {
		const userWeUnfollow = await unfollowUser(id);
		revalidatePath('/');

		if (userWeUnfollow) {
			revalidatePath(`/${userWeUnfollow.following.username}`);
		}

		return userWeUnfollow;
	} catch (error) {
		throw new Error('Internal error');
	}
};
