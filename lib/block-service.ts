import { getSelf } from './auth-service';
import { db } from './db';

//Check if the Logged in user blocked by
export const isBlockedByUser = async (id: string) => {
	try {
		// Get the Logged in user
		const self = await getSelf();

		// Find the blocked user
		const otherUser = await db.user.findUnique({
			where: {
				id: id,
			},
		});

		// We cannot find any user so it will fall back to "catch return false"
		if (!otherUser) {
			throw new Error('User not found');
		}

		// We cant block our selfves
		if (self.id === otherUser.id) {
			return false;
		}

		// Check if we are blocked
		// "findUnique" is much faster the "findFirst"
		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: otherUser.id, // blocker
					blockedId: self.id, // target user
				},
			},
		});

		// if the record exist return true else false
		return !!existingBlock;

		// catch an error
	} catch (error) {
		return false;
	}
};

// Blocking a user
export const blockUser = async (id: string) => {
	// Logged in user
	const self = await getSelf();

	// Check if self.id equals to target user (params id)
	if (self.id === id) {
		throw new Error('Cannot block yourself');
	}

	// Find the target user
	const otherUser = await db.user.findUnique({
		where: { id: id },
	});

	// if user exist
	if (!otherUser) {
		throw new Error('User not found');
	}

	// Check if the target user is already blocked
	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockedId: otherUser.id, // target user
				blockerId: self.id, // blocker
			},
		},
	});

	// if already blocked
	if (existingBlock) {
		throw new Error('Already blocked');
	}

	// block the target user
	const block = await db.block.create({
		data: {
			blockerId: self.id, // blocker
			blockedId: otherUser.id, // target user
		},
		include: {
			blocked: true, // Include the data of blocked user
		},
	});

	return block;
};

// Unblocking a user
export const unblockUser = async (id: string) => {
	// Logged in user
	const self = await getSelf();

	// user cannot block himself
	if (self.id === id) {
		throw new Error('Cannot unblock yourself');
	}

	// find the target user to unblock
	const otherUser = await db.user.findUnique({
		where: { id: id },
	});

	// if user don't exist
	if (!otherUser) {
		throw new Error('User not found');
	}

	// if target user was really blocked
	const existingBlock = await db.block.findUnique({
		where: {
			blockerId_blockedId: {
				blockedId: otherUser.id,
				blockerId: self.id,
			},
		},
	});

	// if no block data found
	if (!existingBlock) {
		throw new Error('Not blocked');
	}

	// Delete the block record
	const unblock = await db.block.delete({
		where: {
			id: existingBlock.id,
		},
		include: {
			blocked: true,
		},
	});

	return unblock;
};
