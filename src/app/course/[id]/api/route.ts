// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// const datasourceUrl = process.env.DATABASE_URL;
// const prisma = new PrismaClient({
//   datasourceUrl,
// });
import prisma from "~/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const course = await prisma.course.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      statements: {
        select:{
          id: true,
          order: true,
          chinese: true,
          english: true,
          soundmark: true
        },
        orderBy: {
          order: 'asc'
        }
      }
    }
  });
  return Response.json({ status: 1, data: course })
}
