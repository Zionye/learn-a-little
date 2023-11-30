import type { NextApiRequest, NextApiResponse } from "next";
import courseData from './01.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = {
      name: '第一节课',
      statements: courseData
    }
    return res.status(200).json({ status: 1, data: data });
  }

  return res.send("Method not allowed.");
}

// export default async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const data = {
//     name: '第一节课',
//     statements: courseData
//   }
//   res.status(200).json({ status: 1, data: data });
// }