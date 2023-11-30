// import type { NextApiRequest, NextApiResponse } from "next";
// // import { PrismaClient } from "@prisma/client";
// import prisma from '~/lib/prismadb'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {


//   if (req.method === "GET") {
//     debugger
//     // const prisma = new PrismaClient();
//     console.log('course prisma: -->', prisma);
//     // const courses =await prisma.statement.findMany()
//     // console.log('courses: ', courses);
//     // // const courses = await prisma.course.findMany({
//     // //   select: {
//     // //     id: true,
//     // //     title: true,
//     // //     statements: {
//     // //       select: {
//     // //         id: true,
//     // //         chinese: true,
//     // //         english: true,
//     // //         soundmark: true,
//     // //       },
//     // //     },
//     // //   },
//     // // });

//     // res.status(200).json({ status: 1, data: courses });
//   }

//   return res.send("Method not allowed.");
// }


import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
import prisma from "~/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const statement = await prisma.statement.findMany();
    return res.status(200).json({ status: 1, data: statement });
  }

  return res.send("Method not allowed.");
}


// // npx ts-node src/pages/api/course.ts
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// async function handler() {
//   const statement = await prisma.statement.findMany();
//   console.log("course statement -->", statement);
// }
// handler();


