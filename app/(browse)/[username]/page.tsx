// Next router
import { notFound } from 'next/navigation';

// Database connection
import { isBlockedByUser } from '@/lib/block-service';
import { isFollowingUser } from '@/lib/follow-service';
import { getSelfByUsername } from '@/lib/user-service';

// [username] component
import { Actions } from './_components/actions';

// Props for Username component
interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params: params }: UserPageProps) => {
	// find the username of other user
	const user = await getSelfByUsername(params.username);
	if (!user) {
		notFound();
	}

	// Return a boolean if the user is being follwed or blocked
	const isFollowing = await isFollowingUser(user.id);
	const isBlocked = await isBlockedByUser(user.id);

	// denie the logged in user to access the profile of user who blocked him
	// if (isBlocked) {
	// 	notFound();
	// }

	return (
		<div className="flex flex-col space-y-4">
			<h1>Username: {user.username}</h1>
			<h1>User Id: {user.id}</h1>
			<p>Is Following: {`${isFollowing}`}</p>
			<p>Is Blocked by this user: {`${isBlocked}`}</p>
			<Actions isFollowing={isFollowing} userId={user.id} />
		</div>
	);
};

export default UserPage;
