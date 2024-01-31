import { getSelf } from './auth-service';
import { db } from './db';

// exporting the 'getRecommended' function for external use
export const getRecommended = async () => {
	// delay the response for 5 seconds;
	// await new Promise((resolve) => setTimeout(resolve, 5000));

	// public variable to store logged in user id
	let userId;

	try {
		// transfer the user id
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId = null;
	}

	// public variable to store users
	let users = [];

	// Retrieve all the users, excluding the current logged in user
	if(userId){
		users = await db.user.findMany({
			where: {
				NOT: {
					id: userId,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

	// retrieving all users, ordered by creation time in descending order if the user is logged out
	}else{
		users = await db.user.findMany({
			orderBy: { createdAt: 'desc' },
		});
	}

	// return users depending on whether the user is logged in or not
	return users;
};
