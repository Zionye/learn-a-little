const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

function main() {
  // let dataBuffer = fs.readFileSync("./01.pdf");
  const filePath = path.join(__dirname, "01.pdf");
  let dataBuffer = fs.readFileSync(filePath);

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text);
    console.log("data result: ", result);

    fs.writeFileSync("./01-text.json", JSON.stringify(data.text));
    fs.writeFileSync("../src/pages/api/01.json", JSON.stringify(result));
  });
}
main();

const STARTSIGN = "中文 英文 K.K.音标";
function parse(text) {
  // 0、先基于 \n 来切分数组
  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });
  console.log("rawTextList: ", rawTextList);

  // 1、先获取到开始的点
  const startIndex = rawTextList.findIndex((t) => t === STARTSIGN);

  // 2、过滤没有的数据
  //   - 空的
  //   - 只有 number 的（这是换页符）
  const textList = rawTextList
    .slice(startIndex + 1)
    .filter((t) => t && !/\d/.test(Number(t)));
  console.log("textList: ", textList);

  /** 对齐格式:
   *   看当前行是否是英文 如果是英文 看是否有音标
   *   如果当前行有英文+音标 那么ok
   *   如果当前行只有英文没有音标 需要做处理
   *     - 处理方式：
   *       - 向下检测 看是否是中文 如果不是中文 就把这一行合并到当前行
   * 
   *   (如果当前行是英文的话 那么检测下一行是否是中文，如果不是中文的话 那么需要把这行的内容合并到当前行 并且删除这行元素)
   * 
   * 算法：
    - 假设第一行一定是中文
    - 检测下一行是不是英文
      - 是
        - 先把它先加到 新的 list 里面 添加到 chinese 字段里（它指的是当前行）
        - 看下一行是什么
      - 否
        - 把下一行的内容附加到当前的字段后面
    - 检测下一行是不是中文
      - 是
        - 先把它先加到 新的 list 里面 添加到 english 字段里（它指的是当前行）
        - 看下一行是什么
      - 否
        - 把下一行的内容附加到当前的字段后面
   */
  // 3、成组 2个为一组（中文 / 英文+音标）
  const result = [];
  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: "",
      english: "",
      soundMark: "",
    };
    // let j = i + 1; // 再继续向下检测

    function run() {
      const element = textList[i];
      let chinese = "";
      let englishAndSoundMark = "";

      // 检测是中文
      if (isChinese(element)) {
        chinese += element;
        // 再继续向下检测
        while (isChinese(textList[i + 1])) {
          chinese += "，" + textList[i + 1];
          i++;
        }
        // i = j;

        data.chinese = chinese;
      } else {
        englishAndSoundMark += element;
        // 再继续向下检测
        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundMark += " " + textList[i + 1];
          i++;
        }
        // i = j;

        //   - 解析 英文+音标 -> 基于 空白符 去切 遇到"/" 就说明是音标
        const { english, soundMark } =
          parseEnglishAndSoundMark(englishAndSoundMark);

        data.english = english;
        data.soundMark = soundMark;
      }
    }
    run();
    i++;
    run();

    result.push(data);
  }

  return result;
}

// 匹配中文字符的正则表达式
function isChinese(str) {
  const chinesePattern = /^[\u4e00-\u9fa5]/;
  return chinesePattern.test(str);
}

// 解析 英文+音标
function parseEnglishAndSoundMark(text) {
  console.log("text: ", text);
  const list = text.split(" ");
  console.log("list: ", list);
  const soundMarkStartIndex = list.findIndex((t) => t.startsWith("/"));

  const english = list.slice(0, soundMarkStartIndex).join(" ");
  const soundMark = list.slice(soundMarkStartIndex).join(" ");

  return {
    english,
    soundMark,
  };
}
