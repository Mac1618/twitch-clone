// Importing the 'currentUser' function from the Clerk library
import { currentUser } from '@clerk/nextjs';

// Importing the PostgreSQL database client 'db' from the local 'db' module using Prisma
import { db } from './db';

// Exporting the 'getSelf' function for external use
export const getSelf = async () => {
	// Fetching data of the currently authenticated user
	const self = await currentUser();

	// Checking if a user is authenticated and has a username
	if (!self || !self.username) {
		throw new Error('Unauthorized!');
	}

	// Querying the database to find the user based on their external user ID
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
