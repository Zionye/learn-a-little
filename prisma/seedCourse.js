// 为数据库播种数据
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");

async function seedCourse() {
  try {
    // 获取 JSON 文件路径
    const jsonFilePath = path.join(
      __dirname,
      "..",
      "scripts",
      "loadCourses.json"
    );
    // 读取 JSON 文件内容
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    // 解析 JSON 数据
    const loadCourses = JSON.parse(jsonData);

    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });

    // 先删除所有的 courses
    await prisma.course.deleteMany();

    const result = [];
    for (const course of loadCourses) {
      const response = await prisma.course.create({
        data: {
          title: course.title,
        },
      });

      result.push({
        title: course.title,
        fileName: course.fileName,
        courseId: response.id,
      });
    }

    await fs.writeFileSync(
      path.join(__dirname, "..", "scripts", "courses.json"),
      JSON.stringify(result)
    );
    console.log("生成 courses.json 成功");
  } catch (error) {
    console.error(error);
  } finally {
    // await prisma.$disconnect();
  }
}
seedCourse();
