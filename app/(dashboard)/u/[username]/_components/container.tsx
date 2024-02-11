'use client';

// React Hooks with Usehooks-ts
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

// Custom Styles
import { cn } from '@/lib/utils';

// Global Variables with zustand for Creator Dashboard
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

// Container Props
interface ContainerProps {
	children: React.ReactNode;
}

// Container Component
export const Container = ({ children: children }: ContainerProps) => {
	// Destructure
	const { collapsed, onCollapsed, onExpand } = useCreatorSidebar();

	// return a boolen if the screen pixel is 1024px
	const matches = useMediaQuery(`(max-width: 1024px)`);

	// if the user is on mobile device
	useEffect(() => {
		// on Small device collapse the sidebar
		if (matches) {
			onCollapsed();

		// on Lage device Expand the sidebar
		} else {
			onExpand();
		}
	}, [matches, onCollapsed, onExpand]);

	return (
		<div className={cn(
      'flex-1',
      collapsed ? 'w-[70px]' : 'w-60'
    )}>
			{children}
		</div>
	);
};
