import { Suspense } from 'react';

// components
import { Navbar } from '@/app/(browse)/_components/navbar/index';
import { Container } from './_components/container';
import { Sidebar, SidebarSkeleton } from './_components/sidebar';

const browseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">
				<Suspense fallback={<SidebarSkeleton />}>
					<Sidebar />
				</Suspense>
				<Container>{children}</Container>
			</div>
		</>
	);
};

export default browseLayout; 
