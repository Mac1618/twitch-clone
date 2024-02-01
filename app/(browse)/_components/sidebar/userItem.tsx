'use client'

// Next Router
import { usePathname } from "next/navigation";
import Link from "next/link";

// shadcn components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// global state
import { useSidebar } from "@/store/use-sidebar";

// Components
import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/components/live-badge";

interface userItemsProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({
  username: username,
  imageUrl: imageUrl,
  isLive: isLive
}: userItemsProps) => {

  // 
  const pathname = usePathname();

  // Destructuring the useSidebar
  const { collapsed } = useSidebar((state) => state);

  //
  const href = `/${username}`;
  const isActive = pathname === href;


  return (
    <Button 
      asChild
      variant='ghost'
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
    )}>
      
      <Link href={href}>
        <div className={cn(
          'flex items-center w-full gap-x-4',
          collapsed && 'justify-center'
        )}>
          {/* User Avatar component */}
          <UserAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={isLive}
            // showBadge
            />

            {/* If not collapsed show username */}
            {!collapsed && (
              <p className="truncate">
                {username}
              </p>
            )}

            {/*  */}
            {!collapsed && isLive &&(
              <LiveBadge className="ml-auto"/>
            )}
        </div>
      </Link>
    </Button>
  )
}


// User List Skeleton
export const UserItemSkeleton = () => {
  return(
    <li className="flex items-center gap-x-4 px-3 py-3">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full"/>
      <div className="flex-1">
        <Skeleton className="h-6"/>
      </div>
    </li>
  )
}