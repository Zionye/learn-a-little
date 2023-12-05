import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
const datasourceUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  console.log('datasourceUrl：', datasourceUrl);
  if (!global.prismadb) {
    global.prismadb = new PrismaClient({
      datasourceUrl,
    });
  }
  prisma = global.prismadb;
}

export default prisma;
