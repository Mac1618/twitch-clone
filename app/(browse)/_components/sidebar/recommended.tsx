'use client';

// users schema
import { User } from "@prisma/client"

// sidebar global state
import { useSidebar } from "@/store/use-sidebar";

// sidebar components
import { UserItem, UserItemSkeleton } from "./userItem";

interface RecommenededProps {
  data: User[];
}

export const Recommended = ({
  data: data
}: RecommenededProps) => {

  // Destructuring the useSidebar
  const { collapsed } = useSidebar((state) => state); 

  // Show lable if collapsed is false and the parameter is empty
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      { showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user) => {
          return(
            // UserItem component
            < UserItem 
              key={user.id}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={false}/>
          )}
        )}
      </ul>
    </div>
  )
}

// Skeleton of Recommended component
export const RecommendedSkeleton = () => {
  return(
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i}/>
      ))}
    </ul>
  )
}