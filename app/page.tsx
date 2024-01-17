// shadcn components
import { Button } from '@/components/ui/button';

// Clerk 
import { UserButton } from '@clerk/nextjs';

export default function Home() {
	return (
		<main className="">
      <h1>For Authenticated user only!</h1>
      <UserButton afterSignOutUrl='/' />
		</main>
	);
}
