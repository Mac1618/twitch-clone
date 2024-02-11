// Creator Dashboard Global variable for sidebar
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

// Creator Dashboard Components
import { Navigation } from './navigation';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export const Sidebar = () => {
	return (
		<Wrapper>
			<Toggle />
			<Navigation />
		</Wrapper>
	);
};
