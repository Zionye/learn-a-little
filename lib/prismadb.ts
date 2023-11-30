import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  console.log('有进来吗')
  if (!global.prismadb) {
    global.prismadb = new PrismaClient();
  }
  prisma = global.prismadb;
}

export default prisma;
