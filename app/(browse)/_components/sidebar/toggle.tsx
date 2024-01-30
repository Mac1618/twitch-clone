'use client';

// zustand store
import { useSidebar } from '@/store/use-sidebar';

// lucide icons library
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

// shadcn ui
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const Toggle = () => {
	// destructuring the useSidebar elements
	const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

	const label = collapsed ? 'Expand' : 'Collapse';

	return (
		<>
			{/* Collapsed sidebar */}
			{collapsed && (
				<div className="hidden lg:flex justify-center items-center pt-4 mb-2">
					<Hint label={label} side="right" asChild>
						<Button onClick={onExpand} variant="ghost" className="h-auto p-2">
							<ArrowRightFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			)}

			{/* Expanded sidebar */}
			{!collapsed && (
				<div className="flex items-center p-3 pl-6 mb-2 w-full">
					<p>For you</p>
					<Hint label={label} side="right" asChild>
						<Button onClick={onCollapsed} className=" h-auto ml-auto p-2" variant="ghost">
							<ArrowLeftFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			)}
		</>
	);
};

// toggle Skeleton for client mode
export const ToggleSkeleton = () => {
	return (
		<div className="p-3 pl-6 w-full hidden lg:flex items-center justify-between">
			<Skeleton className="h-6 w-[100px] " />
			<Skeleton className="h-6 w-6" />
		</div>
	);
};
