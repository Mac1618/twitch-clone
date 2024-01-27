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
			<div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
				<div className="bg-white p-1 rounded-full">
					<Image src="/spooky.svg" alt="logo" width={32} height={32} />
				</div>
				<div className={cn('', font.className)}>
					<p className="text-lg font-semibold">Twitch Clone</p>
					<p className="text-sm text-muted-foreground">Let&apos;s play</p>
				</div>
			</div>
		</Link>
	);
};
