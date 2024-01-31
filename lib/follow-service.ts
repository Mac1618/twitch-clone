// Databases
import { getSelf } from './auth-service';
import { db } from './db';

// Check if the user follow the other user
export const isFollowingUser = async (id: string) => {
	try {
		// get the logged in user
		const self = await getSelf();

		// Find the user to follow
		const otherUser = await db.user.findUnique({
			where: { id: id },
		});

		// Check if other user exists
		if (!otherUser) {
			throw new Error('User not found');
		}

		// check if the logged in user and the other user has same id
		if (otherUser.id === self.id) {
			// logged in user is a follower of himself no need to follow
			return true;
		}

		// Check if logged in user follows the other user
		const existingFollow = await db.follow.findFirst({
			where: {
				followerId: self.id,
				followingId: otherUser.id,
			},
		});

		// return a boolean
		return !!existingFollow;
	} catch (error) {
		return false;
	}
};

// Follow a user
export const followUser = async (id: string) => {
	// Data of Logged in user
	const user = await getSelf();

	// Find the otherUser
	const otherUser = await db.user.findUnique({
		where: { id: id },
	});

	// Check if otherUser exist
	if (!otherUser) {
		throw new Error('User not found');
	}

	// Check if Logged in user is equal to other user id
	if (user.id === otherUser.id) {
		throw new Error('You cannot follow yourself');
	}

	// Find the first match in database
	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: user.id,
			followingId: otherUser.id,
		},
	});

	// Check if user already follows the other user
	if (existingFollow) {
		throw new Error('Already following');
	}

	// save the following
	const follow = await db.follow.create({
		data: {
			followerId: user.id,
			followingId: otherUser.id,
		},
		include: {
			follower: true,
			following: true,
		},
	});

	return follow;
};

// Unfollow a user
export const unfollowUser = async (id: string) => {
	// Logged in user Id
	const user = await getSelf();

	// selected user to unfollow
	const otherUser = await db.user.findUnique({
		where: { id: id }, 
	})

	// Check if the user exist
	if(!otherUser) {
		throw new Error('User not found');
	}

	// Check if the user and the seleted user id is the same
	if(user.id === otherUser.id) {
		throw new Error('You cannot unfollow yourself')
	}

	// Check if the user is already following the selected user
	const existingFollow = await db.follow.findFirst({
		where: {
			followerId: user.id,
			followingId: otherUser.id,
		}
	})

	// If still not following
	if(!existingFollow) {
			// User should follow the selected user before unfollowing
		throw new Error('You are not yet following this user')
	}

	// unfollow the selected user
	const unfollow = await db.follow.delete({
		where: {
			id: existingFollow.id
		},
		include: {
			following: true,
		}
	})

	return unfollow;
};
