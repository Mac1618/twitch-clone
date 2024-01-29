"use client";

import { useSidebar } from '@/store/use-sidebar';

import { cn } from '@/lib/utils';

interface WrapperProps {
	children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
	// destructure the elements from useSidebar
	const { collapsed } = useSidebar((state) => state);
	return (
		<aside
			className={cn(
				'fixed left-0 h-full w-60 flex flex-col bg-background border-r border-[#2D2E35 z-50]', collapsed && 'w-[70px]'
			)}
		>
			{children}
		</aside>
	);
};
