'use client';

// Pendeng / Loading state
// waiting for content to load before transitioning to the next screen
import { useTransition } from 'react';

// server component
import { onBlock, onUnblock } from '@/actions/block';
import { onFollow, unFollow } from '@/actions/follow';

// shadcn components
import { Button } from '@/components/ui/button';

// Sonner Toast Component
import { toast } from 'sonner';

interface ActionProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({ isFollowing: isFollowing, userId: userId }: ActionProps) => {
	const [isPending, startTransition] = useTransition();

	// Handle FOLLOW button
	const handleFollow = () => {
		// Wrap the code inside startTransition
		startTransition(() => {
			onFollow(userId)
				.then((data) => {
					toast.success(`You are now following ${data.following.username}`);
				})
				.catch(() => {
					toast.error('Something went wrong');
				});
		});
	};

	// Handle UNFOLLOW button
	const handleUnfollow = () => {
		// Wrap the code inside startTransition
		startTransition(() => {
			unFollow(userId)
				.then((data) => {
					toast.success(`You have unfollowed ${data.following.username}`);
				})
				.catch(() => {
					toast.error('Something went wrong');
				});
		});
	};

	const onClick = () => {
		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	};

	// Handle block user
	const handleBlock = () => {
		startTransition(() => {
			onBlock(userId)
				.then((data) => {
					toast.success(`Blocked the user ${data.blocked.username}`);
				})
				.catch(() => {
					toast.error('Something went wrong');
				});
		});
	};

	// Handle unblock user
	const handleUnblock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then((data) => {
					toast.success(`Unblocked the user ${data.blocked.username}`)
				})
				.catch(() => {
					toast.error('Something went wrong')
				})
		})
	}

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant="primary">
				{isFollowing ? 'Unfollow' : 'Follow'}
			</Button>
			<Button disabled={isPending} onClick={handleUnblock}>
				Unblock
			</Button>
		</>
	);
};
