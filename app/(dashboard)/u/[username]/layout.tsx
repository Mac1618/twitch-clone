// components
import { Navbar } from '@/app/(browse)/_components/navbar';

// Server components
import { getUserByUsername } from '@/lib/auth-service';

// Creator Layout Props
interface CreatorLayoutProps {
	params: { username: string };
	children: React.ReactNode;
}

// Creator Layout Component
const CreatorLayout = async ({
	params: params, // params for server component
	children: children, // children
}: CreatorLayoutProps) => {
	// GET the Logged in user by passing username
	const user = await getUserByUsername(params.username);

	return (
		<div>
			<div className="h-10 flex justify-center items-center bg-red-400">Navbar</div>
			{children}
		</div>
	);
};

export default CreatorLayout;
