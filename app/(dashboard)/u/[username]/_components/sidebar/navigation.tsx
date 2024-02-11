'use client';

// Next Router
import { usePathname } from 'next/navigation';

// Clerk
import { useUser } from '@clerk/nextjs';

// Lucide Icons
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';

// Creator Dashboard Components
import { NavItem } from './nev-items';

export const Navigation = () => {
	// Find the current page path
	const pathname = usePathname();

	// use to get the username
	const { user } = useUser();

	// Navigation Routes
	const routes = [
		{
			label: 'Steam',
			href: `/u/${user?.username}`,
			icon: Fullscreen,
		},
		{
			label: 'Keys',
			href: `/u/${user?.username}/keys`,
			icon: KeyRound,
		},
		{
			label: 'Chat',
			href: `/u/${user?.username}/chat`,
			icon: MessageSquare,
		},
		{
			label: 'Community',
			href: `/u/${user?.username}/community`,
			icon: Users,
		},
	];

	return (
		<ul className="space-y-2 px-2 pt-4 lg:pt-0">
			{routes.map((route) => (
				<NavItem
					key={route.href}
					label={route.label}
					href={route.href}
					icon={route.icon}
					isActive={pathname === route.href}
				/>
			))}
		</ul>
	);
};
