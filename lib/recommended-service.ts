import { resolve } from 'path';
import { getSelf } from './auth-service';
import { db } from './db';

// exporting the 'getRecommended' function for external use
export const getRecommended = async () => {
	// delay the response for 5 seconds;
	await new Promise((resolve) => setTimeout(resolve, 5000));

	// retrieving all users, ordered by creation time in descending order
	const users = await db.user.findMany({
		orderBy: { createdAt: 'desc' },
	});

	// return all users
	return users;
};
