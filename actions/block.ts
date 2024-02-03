'use server';

// Next Router
import { revalidatePath } from 'next/cache';

// Import Services
import { blockUser, unblockUser } from '@/lib/block-service'; // Blocking a user

// 
export const onBlock = async (id: string) => {
	//TODO: Adapt to disconnect from livestream
	//TODO: Allow ability to kick a guest

	// pass the parameters id (target user to block)
	const blockedUser = await blockUser(id);

	revalidatePath(`/`);

	if (blockedUser) {
		revalidatePath(`/${blockedUser.blocked.username}`);
	}

	return blockedUser;
};

export const onUnblock = async (id: string) => {
	// pass the parameters id (target user to unblock)
	const unblockedUser = await unblockUser(id);

	revalidatePath(`/`);

	if (unblockedUser) {
		revalidatePath(`/${unblockedUser.blocked.username}`);
	}

	return unblockedUser;
};
