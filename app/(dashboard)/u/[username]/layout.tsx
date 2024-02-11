// Server components
import { getUserByUsername } from '@/lib/auth-service';
import { redirect } from 'next/navigation';

// dashboard components
import { Container } from './_components/container';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

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
	const self = await getUserByUsername(params.username);

	// If no user found, redirect to home page
	if (!self) {
		redirect('/');
	}

	return (
		<>
			<Navbar />
			<div className="pt-20 h-full flex ">
				<Sidebar />
				<Container>{children}</Container>
			</div>
		</>
	);
};

export default CreatorLayout;
