// components
import Navbar from '@/app/(browse)/_components/navbar/index';
import { Sidebar } from './_components/sidebar';

const browseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">
				<Sidebar />
				{children}
			</div>
		</>
	);
};

export default browseLayout;
