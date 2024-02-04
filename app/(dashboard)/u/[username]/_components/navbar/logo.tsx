//  Next
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

// shadcn
import { cn } from '@/lib/utils';

const font = Poppins({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const Logo = () => {
	return (
		<Link href={'/'}>
			<div className="flex items-center gap-x-4 hover:opacity-75 transition">
				<div className="bg-white p-1 rounded-full mr-12 shrink-0 lg:mr-0 lg:shrink">
					<Image src="/spooky.svg" alt="logo" width={32} height={32} />
				</div>
				<div className={cn('hidden lg:block', font.className)}>
					<p className="text-lg font-semibold">Twitch Clone</p>
					<p className="text-sm text-muted-foreground">Creator dashboard</p>
				</div>
			</div>
		</Link>
	);
};
