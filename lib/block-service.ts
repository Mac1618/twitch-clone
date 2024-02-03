import { getSelf } from './auth-service';
import { db } from './db';

//Check if the Logged in user blocked by
export const isBlockedByUser = async (id: string) => {
	try {
		// Get the Logged in user
		const self = await getSelf();

		// if Block ID = Params ID
		const otherUser = await db.block.findUnique({
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
        blockerId_blockedId:{
          blockerId: otherUser.id,
          blockedId: self.id,
        }
			},
		});

		// if the record exist return true else false
		return !!existingBlock;

		// catch an error
	} catch (error) {
		return false;
	}
};
