import { PrismaClient } from '@prisma/client';

// Preventing "Hot Reload" from happening if not in "production" mode
declare global {
	var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
