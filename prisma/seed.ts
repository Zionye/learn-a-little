// 为数据库播种数据
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedStatement() {
  try {
    const statement = await prisma.statement.create({
      data: {
        chinese: "你好",
        english: "Hello",
        soundmark: "/ni hao/",
        order: 1,
      },
    });
    console.log("seed statement", statement);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedStatement();
