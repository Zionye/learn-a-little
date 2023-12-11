import prisma from "~/lib/prismadb";

export async function GET() {
  const course = await prisma.course.findMany({
    select: {
      id: true,
      title: true
    }
  });
  return Response.json({ status: 1, data: course })
}

export async function POST(request: Request){
  const { title } = await request.json()
  const course = await prisma.course.create({
    data: {
      title: title
    }
  })
  return Response.json({ status: 1, data: course })
}
