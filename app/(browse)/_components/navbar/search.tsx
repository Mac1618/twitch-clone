'use client';

// next
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Importing query-string library for parsing and formatting URL query strings
import qs from 'query-string';

// shadcn-ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Search = () => {
	const router = useRouter(); // Initializing the router hook
	const [value, setValue] = useState(''); // Initializing state for the search input value

	// Function to handle form submission
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// If search value is empty, return
		if (!value) {
			return;
		}

		// Constructing the URL with the search term using query-string library
		const url = qs.stringifyUrl(
			{
				url: '/search',
				query: { term: value },
			},
			{ skipEmptyString: true }
		);

		// Navigating to the constructed URL
		router.push(url);
	};

	// clear the search bar
	const clearValue = () => {
		setValue('');
	};

	return (
		<form onSubmit={onSubmit} className="relative w-full lg:w-[400px] flex items-center">
			<Input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Search..."
				className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-within:ring-offset-0"
			/>
			{value && (
				<X
					className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
					onClick={clearValue}
				/>
			)}
			<Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
				<SearchIcon className="h-5 w-5 text-muted-foreground" />
			</Button>
		</form>
	);
};

export default Search;
