import { it, expect, describe } from "vitest";
import { parse, parseEnglishAndSoundmark } from "./parsePdf";

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
        soundmark: "/aɪ/",
      },
      {
        chinese: "现在",
        english: "now",
        soundmark: "/naʊ/",
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
        soundmark: "/aɪ/",
      },
      {
        chinese: "我需要告诉你重要的某些事",
        english: "i need to tell you something important",
        soundmark: "/i/ /nid/ /te/",
      },
      {
        chinese: "现在",
        english: "now",
        soundmark: "/naʊ/",
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
        soundmark: "/naʊ/",
      },
      {
        chinese: "我；这件事",
        english: "I",
        soundmark: "/aɪ/",
      },
    ]);
  });

  describe("parse English And soundmark", () => {
    it("parse simply ", () => {
      expect(parseEnglishAndSoundmark("now /naʊ/")).toEqual({
        english: "now",
        soundmark: "/naʊ/",
      });
    });

    it("parse multi group ", () => {
      expect(parseEnglishAndSoundmark("now i /naʊ/ /aɪ/")).toEqual({
        english: "now i",
        soundmark: "/naʊ/ /aɪ/",
      });
    });
  });
});
