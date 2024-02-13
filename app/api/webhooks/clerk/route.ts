import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

// Prisma DB
import { db } from '@/lib/db';

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	// Check if "CLERK_WEBHOOK_SECRET" have value
	if (!WEBHOOK_SECRET) {
		throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}

	// Get the type
	const eventType = evt.type;

	// this logs on the terminal
	// console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
	// console.log('Webhook body:', body);

	// you can view "payload" sample logs here: https://dashboard.clerk.com/apps/app_2b5cT7clKmr5qUF1366RQWO3hWE/instances/ins_2b5cT4jTUrUqNRhY9ZoWHF6PkiR/webhooks

	// CREATE
	if (eventType === 'user.created') {
		// create new user
		await db.user.create({
			data: {
				username: payload.data.username,
				imageUrl: payload.data.image_url,
				externalUserId: payload.data.id,
				stream: {
					create: {
						name: `${payload.data.username}'s stream`,
					},
				},
			},
		});
	}

	// UPDATE
	if (eventType === 'user.updated') {
		// find the user id to update the user
		await db.user.update({
			where: {
				externalUserId: payload.data.id,
			},
			data: {
				username: payload.data.username,
				imageUrl: payload.data.image_url,
			},
		});
	}

	// DELETE
	if (eventType === 'user.deleted') {
		// find the user id to delete the user
		await db.user.delete({
			where: {
				externalUserId: payload.data.id,
			},
		});
	}

	return new Response('', { status: 200 });
}
