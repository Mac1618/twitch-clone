'use client';

// Pendeng / Loading state
// waiting for content to load before transitioning to the next screen
import { useTransition } from 'react';

// server component
import { onFollow, unFollow } from '@/actions/follow';

// shadcn components
import { Button } from '@/components/ui/button';

// Sonner Toast Component
import { isAppBuiltinNotFoundPage } from 'next/dist/build/utils';
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
					toast.success(`YOu have unfollowed ${data.following.username}`);
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

	return (
		<Button disabled={isPending} onClick={onClick} variant="primary">
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
};
