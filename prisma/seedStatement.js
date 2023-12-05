// 为数据库播种数据
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");

async function seedCourse() {
  try {
    const courses = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "scripts", "courses.json"))
    );
    const datasourceUrl = process.env.DATABASE_URL;

    console.log(courses, datasourceUrl);

    const prisma = new PrismaClient({
      datasourceUrl,
    });

    await prisma.statement.deleteMany();

    let orderIndex = 1;
    for (const { cId, fileName } of courses) {
      const courseDataText = fs.readFileSync(
        path.join(__dirname, "..", "scripts", `courses/${fileName}.json`),
        "utf-8"
      );
      const courseData = JSON.parse(courseDataText);

      const promiseAll = courseData.map((statement, index) => {
        const { chinese, english, soundmark } = statement;
        const result = createStatement(
          orderIndex,
          chinese,
          english,
          soundmark,
          cId
        );
        orderIndex++;
        return result;
      });

      console.log(`开始上传： courseName:${fileName}`);
      await Promise.all(promiseAll);
      console.log(`courseName: ${fileName} 全部上传成功`);
    }

    async function createStatement(
      order,
      chinese,
      english,
      soundmark,
      courseId
    ) {
      await prisma.statement.create({
        data: {
          order,
          chinese,
          english,
          soundmark,
          courseId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    // await prisma.$disconnect();
  }
}
seedCourse();
