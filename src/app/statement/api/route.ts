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
//       order: 1,
//       courseId: "clpl5r2zh0000ul7t62rr4pum"
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
// import { PrismaClient } from "@prisma/client";
// const datasourceUrl = process.env.DATABASE_URL;
// const prisma = new PrismaClient({
//   datasourceUrl,
// });
import prisma from "~/lib/prismadb";

export async function POST(req: Request) {
  const statement = await prisma.statement.findMany();
  return Response.json({statue: 1, data: statement})

  // // try{
  //   const { order, chinese, english, soundmark, courseId } = await req.json()
  //   const statement = await prisma.statement.create({
  //     data: {
  //       order,
  //       chinese,
  //       english,
  //       soundmark,
  //       courseId
  //     }
  //   })
  //   return Response.json({statue: 1, data: statement})
  // // }catch(error: any){
  // //   console.error("Failed to create statement:", error)
  // //   return Response.json({statue: 0, error: error.message })
  // //   // return Response.json({statue: 0, error })
  // // }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const statement = await prisma.statement.findMany();
//     return res.status(200).json({ status: 1, data: statement });
//   }

//   return res.send("Method not allowed.");
// }