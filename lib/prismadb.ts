import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
const datasourceUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  console.log('有进来吗')
  if (!global.prismadb) {
    global.prismadb = new PrismaClient({
      datasourceUrl,
    });
  }
  prisma = global.prismadb;
}

export default prisma;
