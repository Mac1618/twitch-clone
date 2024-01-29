import Link from 'next/link';

// lucide react library for icons
import { Clapperboard } from 'lucide-react';

// Clerk
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';

// shadcn ui
import { Button } from '@/components/ui/button';

export const Action = async () => {
	const user = await currentUser();

	return (
		<div className="flex justify-end items-center gap-x-2 ml-4 lg:ml-0">
			{/* No logged in user */}
			{!user && (
				<SignInButton>
					<Button variant="primary" size="sm">
						Login
					</Button>
				</SignInButton>
			)}

			{/* User is logged in */}
			{user && (
				<div className="flex items-center gap-x-4">
					<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
						<Link href={`/u/${user.username}`} className="flex">
							<Clapperboard className="w-5 h-5 lg:mr-2" />
							<span className="hidden lg:block">Dashboard</span>
						</Link>
					</Button>
					<UserButton afterSignOutUrl="/" />
				</div>
			)}
		</div>
	);
};
