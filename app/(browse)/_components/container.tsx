'use client';

import { cn } from "@/lib/utils";
import { useEffect } from "react";

// zustand store
import { useSidebar } from "@/store/use-sidebar";

// usehooks-ts
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({
  children,
}: ContainerProps) => {

  // check if the max-with is lg device
  const matches = useMediaQuery("(max-width: 1024px)")

  // desctructure the useSidebar from store
  const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    // if in Mobile and Tablet Mode collapse the sidebar
    if(matches) {
      onCollapsed();

    // else (Desktop Mode) expand the sidebar
    } else {
      onExpand();
    }
  }, [matches, onCollapsed, onExpand]);

  return(
    <div className={cn(
        "flex-1",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
      )}>
      { children }
    </div>
  )
}