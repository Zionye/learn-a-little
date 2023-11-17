import { it, expect, describe } from "vitest";
import { parse, parseEnglishAndSoundMark } from "./parsePdf";

describe("parsePdf", () => {
  it("happy path", () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "\n" +
      "3 \n" +
      "现在 \n" +
      "now /naʊ/ \n";

    expect(parse(pdfText)).toEqual([
      {
        chinese: "我",
        english: "I",
        soundMark: "/aɪ/",
      },
      {
        chinese: "现在",
        english: "now",
        soundMark: "/naʊ/",
      },
    ]);
  });

  it.only("complex", () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "\n" +
      "3 \n" +
      "我需要告诉你重要的某些事 \n" +
      "i need to tell you something important \n" +
      "/i/ /nid/ /te/ \n" +
      "现在 \n" +
      "now /naʊ/ \n";

    expect(parse(pdfText)).toEqual([
      {
        chinese: "我",
        english: "I",
        soundMark: "/aɪ/",
      },
      {
        chinese: "我需要告诉你重要的某些事",
        english: "i need to tell you something important",
        soundMark: "/i/ /nid/ /te/",
      },
      {
        chinese: "现在",
        english: "now",
        soundMark: "/naʊ/",
      },
    ]);
  });

  it("中文里包含符号", () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "现在 \n" +
      "now /naʊ/ \n" +
      "我；这件事 \n" +
      "I /aɪ/ \n";

    expect(parse(pdfText)).toEqual([
      {
        chinese: "现在",
        english: "now",
        soundMark: "/naʊ/",
      },
      {
        chinese: "我；这件事",
        english: "I",
        soundMark: "/aɪ/",
      },
    ]);
  });

  describe("parse English And SoundMark", () => {
    it("parse simply ", () => {
      expect(parseEnglishAndSoundMark("now /naʊ/")).toEqual({
        english: "now",
        soundMark: "/naʊ/",
      });
    });

    it("parse multi group ", () => {
      expect(parseEnglishAndSoundMark("now i /naʊ/ /aɪ/")).toEqual({
        english: "now i",
        soundMark: "/naʊ/ /aɪ/",
      });
    });
  });
});
