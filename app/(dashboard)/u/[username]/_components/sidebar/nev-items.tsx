// Lucide Icons Type for props
import { LucideIcon } from 'lucide-react';

// Next Router
import Link from 'next/link';

// Dynamic Classname
import { cn } from '@/lib/utils';

// Creator Dashboard Global variable for sidebar
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

// Shadcn ui
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// NavItem Props
interface NavItemProps {
	label: string;
	href: string;
	icon: LucideIcon;
	isActive: boolean;
}

export const NavItem = ({
	label: label,
	href: href,
	icon: Icon, // capital 1st letter for Icons
	isActive: isActive,
}: NavItemProps) => {
	// Destructure
	const { collapsed } = useCreatorSidebar((state) => state);

	return (
		<Button
			asChild //
			variant="ghost"
			className={cn(
				'w-full h-12',
				collapsed ? 'justify-center' : 'justify-start', // layout for devices on collapse
				isActive && 'bg-accent' // bg effect for selected item
			)}
		>
			<Link href={href}>
				<Icon
					className={cn(
						'h-4 w-4', // Icon style
						collapsed ? 'mr-0' : 'mr-2' // margin for devices on collapse
					)}
				/>

				{/*  Show label when not collapse */}
				{!collapsed && ( //
					<span>{label}</span>
				)}
			</Link>
		</Button>
	);
};

// NavItem Skeleton or Loading state
export const NavItemSkeleton = () => {
	return (
		<li className="flex items-center gap-x-4 px-3 py-2">
			<Skeleton className="min-h-12 min-w-12 rounded-md" />
			<div className="flex-1 hidden lg:block">
				<Skeleton className="h-6" />
			</div>
		</li>
	);
};
