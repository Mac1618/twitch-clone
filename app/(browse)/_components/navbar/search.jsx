'use client';

// next
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// query-string
import qs from 'query-string';

// shadcn-ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const search = () => {
	return (
		<form className="relative w-full lg:w-[400px] flex items-center">
      <Input placeholder='Search...' className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:ring-offset-0'/>
      <Button type='submit' size='sm' variant='secondary' className='rounded-l-none'>
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
		</form>
	);
};

export default search;
