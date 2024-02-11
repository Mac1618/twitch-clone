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
