// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";


// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const prisma = new PrismaClient()
//   console.log('prisma: ', prisma);
  
//   const statement = await prisma.statement.create({
//     data: {
//       chinese: '吃',
//       english: 'eat',
//       soundmark: '/it/',
//       order: 1
//     }
//   })

//   res.status(200).json({ data: statement,});
//   // res.status(200).json({ status: 1, data: data });

//   // return Response.json({statue: 1, data: statement})
//   // // return {
//   // //   statusCode: 200,
//   // //   body: JSON.stringify({ status: 1, data: statement }),
//   // // };
// }


// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
import prisma from "~/lib/prismadb";

export async function GET(req: Request) {
    const statements = await prisma.statement.findMany();
    return Response.json({statue: 1, data: statements})
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const statement = await prisma.statement.findMany();
//     return res.status(200).json({ status: 1, data: statement });
//   }

//   return res.send("Method not allowed.");
// }