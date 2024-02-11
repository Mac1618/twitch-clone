'use client';

// Creator Sidebar global variable
import { useCreatorSidebar } from '@/store/use-creator-sidebar';

// Lucuide Icons
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

// Shadcn UI
import { Button } from '@/components/ui/button';

// Reusable Components
import { Hint } from '@/components/hint';

export const Toggle = () => {
	// Destruction useCreatorSidebar
	const { collapsed, onCollapsed, onExpand } = useCreatorSidebar();

	// Label for the Hint Component
	const label = collapsed ? 'Expanded' : 'Collapsed';
	return (
		<>
			{/* Collapsed Creator Sidebar */}
			{collapsed && (
				<div className="w-full hidden lg:flex justify-center items-center pt-4 mb-4">
					<Hint label="Expand" side="right" asChild>
						<Button onClick={onExpand} variant="ghost" className="h-auto p-2">
							<ArrowRightFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			)}

			{/* Expanded Creator Sidebar */}
			{!collapsed && (
				<div className="w-full hidden lg:flex items-center p-3 pl-6 mb-2">
					<p className="font-semibold text-primary">Dashboard</p>
					<Hint label="Collapse" side="right" asChild>
						<Button onClick={onCollapsed} variant="ghost" className="h-auto p-2 ml-auto">
							<ArrowLeftFromLine className="h-4 w-4" />
						</Button>
					</Hint>
				</div>
			)}
		</>
	);
};
