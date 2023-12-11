const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

(async () => {
  // 读取 pdf 中的所有文件
  const courseFiles = fs
    .readdirSync("./pdf")
    .filter((fileName) => {
      return !fileName.startsWith(".");
    })
    .map((fileName) => {
      // return fileName.replace(".pdf", "");
      return path.basename(fileName, ".pdf");
    });

  for (const courseFile of courseFiles) {
    main(courseFile);
  }
})();

function main(courseFileName) {
  console.log("__dirname: ", __dirname);
  const filePath = path.join(__dirname, `pdf/${courseFileName}.pdf`);
  console.log("filePath: ", filePath);
  let dataBuffer = fs.readFileSync(filePath);

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text);
    console.log("data result: ", result);

    // fs.writeFileSync("./01-text.json", JSON.stringify(data.text));
    fs.writeFileSync(
      `./courses/${courseFileName}.json`,
      JSON.stringify(result)
    );
  });
}

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
      soundmark: "",
    };
    // let j = i + 1; // 再继续向下检测

    function run() {
      const element = textList[i];
      let chinese = "";
      let englishAndSoundmark = "";

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
        englishAndSoundmark += element;
        // 再继续向下检测
        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundmark += " " + textList[i + 1];
          i++;
        }
        // i = j;

        //   - 解析 英文+音标 -> 基于 空白符 去切 遇到"/" 就说明是音标
        const { english, soundmark } =
          parseEnglishAndSoundmark(englishAndSoundmark);

        data.english = english;
        data.soundmark = soundmark;
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
function parseEnglishAndSoundmark(text) {
  console.log("text: ", text);
  const list = text.split(" ");
  console.log("list: ", list);
  const soundmarkStartIndex = list.findIndex((t) => t.startsWith("/"));

  const english = list.slice(0, soundmarkdStartIndex).join(" ").trim();
  // const soundmark = list.slice(soundmarkStartIndex).join(" ");
  // 去掉音标中多余空格仅保留一个：
  //   - "/wi/    /dont/    /nid/    /tə/ /'ænsɚ/ /ðə/ /'kwestʃənz/ /ə'baʊt/ /ðə/ /wɝk/"
  //   - "/ju /laɪk/ /tə/ /tɔk/ /wɪð/ /mi/"
  let rawSoundmark = list
    .slice(soundmarkStartIndex)
    .join(" ")
    .split("/")
    .map((t) => {
      return t.trim().replace(/\s+/g, " ");
    })
    .filter((t) => {
      return t !== "";
    })
    .toString();

  const soundmark = `/${rawSoundmark.replace(/,/g, "/ /") + "/"}`;

  return {
    english,
    soundmark,
  };
}
