'use client';

// Prisma Models
import { Follow, User } from '@prisma/client';

// Global variables from store
import { useSidebar } from '@/store/use-sidebar';

// Sidebar Components
import { UserItem } from './userItem';
import { UserItemSkeleton } from './userItem';

// Shadcn components
import { Skeleton } from '@/components/ui/skeleton';

interface FollowingProps {
	data: (Follow & { following: User })[];
}

export const Following = ({ data: data }: FollowingProps) => {
	// Destructure the useSidebar
	const { collapsed } = useSidebar();

	// IF data lenght is 0 return null
	if (!data.length) {
		return null;
	}

	return (
		<div className='ml-5 mb-3'>
      {/* Header */}
			{!collapsed && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Following</p>
				</div>
			)}
      {/* Render the following users */}
      <ul>
        { data.map((follow) => (
          <UserItem 
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
          />
        )) }
      </ul>
		</div>
	);
};


export const FollowingSkeleton = () => {
  return(
    <ul className='px-2 pt-2 lg:pt-0'>
      { [...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i}/>
      ))}
    </ul>
  )
} 