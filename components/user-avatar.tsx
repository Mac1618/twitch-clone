// used for custom variants and sizes
import { cva, type VariantProps } from 'class-variance-authority';

// shadcn components
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

// components
import { LiveBadge } from './live-badge';

// customize the avatar image sizes
const avatarSizes = cva('', {
	variants: {
		size: {
			default: 'h-8 w-8',
			lg: 'h-14 w-14',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

// types of the props
interface userAvatarProps extends VariantProps<typeof avatarSizes> {
	username: string;
	imageUrl: string;
	isLive?: boolean;
	showBadge: boolean;
}

//
export const UserAvatar = ({
	username: username,
	imageUrl: imagerUrl,
	isLive: isLive,
	showBadge: showBadge,
	size: size,
}: userAvatarProps) => {
	const canShowBadge = showBadge && isLive;

	return (
		<div className="relative">
			<Avatar
				className={cn(
					isLive && 'ring-2 ring-rose-500 border border-background',
					avatarSizes({ size: 'default' })
				)}
			>
				<AvatarImage src={imagerUrl} className="object-cover" />
				<AvatarFallback>
					{/* First letter of username */}
					{username[0]}
					{/* Last letter of username */}
					{username[username.length - 1]}
				</AvatarFallback>
			</Avatar>
      {canShowBadge && (
          <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
              <LiveBadge />
          </div>
      )}
		</div>
	);
};


// Avatar image Skeleton
interface UserAvatarSkeletonProps 
  extends VariantProps<typeof avatarSizes>{}


export const UserAvatarSkeleton = ({size: size}: UserAvatarSkeletonProps) => {
  return(
    <Skeleton className={cn(
      'rounded-full',
      avatarSizes({ size: 'default'})
    )} />
  )
}
