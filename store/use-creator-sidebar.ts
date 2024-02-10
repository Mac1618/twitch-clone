// Zustand library
import { create } from 'zustand';

// Defining the structure of the CreatorSidebarStore interface
interface CreatorSidebarStore {
	collapsed: boolean; // Represents whether the sidebar is collapsed or expanded
	onExpand: () => void; // Function to expand the sidebar
	onCollapsed: () => void; // Function to collapse the sidebar
}

// Creating a custom hook 'useSidebar' using the 'create' function
export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
	collapsed: false, // Initializing the sidebar as expanded by default
	onExpand: () => set(() => ({ collapsed: false })), // Defining the action to expand the sidebar
	onCollapsed: () => set(() => ({ collapsed: true })), // Defining the action to collapse the sidebar
}));
