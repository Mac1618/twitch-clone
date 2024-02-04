// Importing the 'currentUser' function from the Clerk library
import { currentUser } from '@clerk/nextjs';

// Importing the PostgreSQL database client 'db' from the local 'db' module using Prisma
import { db } from './db';

// GET Logged in user information
export const getSelf = async () => {
	// Fetching data of the currently authenticated user
	const self = await currentUser();

	// Checking if a user is authenticated and has a username
	if (!self || !self.username) {
		throw new Error('Unauthorized!');
	}

	// get the user by the "clerk id" stored in the database
	const user = await db.user.findUnique({
		where: { externalUserId: self.id },
	});

	// Checking if the user exists in the database
	if (!user) {
		throw new Error('No user found.');
	}

	// Returning the user object if found
	return user;
};

// Load Creator Dashboard using the logged in user's 'username'
export const getUserByUsername = async (username: string) => {
	const self = await getSelf();

	// If there is a logged in user
	if (!self || !self.username) {
		throw new Error('Unauthorized!');
	}

	// Query the user by the username
	const user = await db.user.findUnique({
		where: {
			username: username,
		},
	});

	// No user found
	if (!user) {
		throw new Error('User not found.');
	}

	// If Logged in username and the queried user is not the same
	if (user.username !== self.username) {
		throw new Error('Unauthorized user');
	}

	// return user data
	return user;
};
