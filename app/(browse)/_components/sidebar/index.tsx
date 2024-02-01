// Sidebar Components
import { Recommended, RecommendedSkeleton } from './recommended';
import { Following, FollowingSkeleton } from './following';
import { Toggle, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';

// Database Queries
import { getRecommended } from '@/lib/recommended-service';
import { getFollowedUsers } from '@/lib/follow-service';

export const Sidebar = async () => {
	// List of recommened users
	const recommended = await getRecommended();
	const following = await getFollowedUsers();

	return (
		<Wrapper>
			<Toggle />
			<div className="space-x-4 pt-4 lg:pt-0">
				<Following data={following} />
				<Recommended data={recommended} />
			</div>
		</Wrapper>
	);
};

// Sidebar Skeleton
export const SidebarSkeleton = () => {
	return (
		<aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2DE35] z-50">
			<ToggleSkeleton />
			<FollowingSkeleton />
			<RecommendedSkeleton />
		</aside>
	);
};
