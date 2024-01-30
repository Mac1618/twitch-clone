'use client';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import { useEffect, useState } from 'react';

// Skeletons components
import { RecommendedSkeleton } from './recommended';
import { ToggleSkeleton } from './toggle';

// Wrapper props types
interface WrapperProps {
	children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
	const [isClient, setIsClient] = useState(false);
	// destructure the elements from useSidebar
	const { collapsed } = useSidebar((state) => state);

	// useEffect only happen in client mode
	useEffect(() => {
		setIsClient(true);
	}, []);

	// if not in client mode run this skeleton
	if (!isClient) {
		return (
			<aside className="fixed left-0 h-full w-[70px] lg:w-60 flex flex-col bg-background border-r border-[#2D2E35 z-50]">
				<ToggleSkeleton /> 
				<RecommendedSkeleton />
			</aside>
		);
	}
	return (
		<aside
			className={cn(
				'fixed left-0 h-full w-[70px] lg:w-60 flex flex-col bg-background border-r border-[#2D2E35 z-50]',
				collapsed && 'w-[70px]'
			)}
		>
			{children}
		</aside>
	);
};
