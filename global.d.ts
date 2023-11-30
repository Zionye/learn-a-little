import type { PrismaClient } from '@prisma/client';

// 解决 var global: typeof globalThis
declare global {
  namespace globalThis {
    var prismadb: PrismaClient
  }
}
