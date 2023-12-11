import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// const path = require("path");
// const dotenv = require("dotenv");

// const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

// if (isDev) {
//   dotenv.config({
//     path: path.resolve(__dirname, "../.env.development"),
//     override: true,
//   });
// } else if (process.env.NODE_ENV === "production") {
//   dotenv.config({ path: path.resolve(__dirname, "../.env.production") });
// } else {
//   console.error(`无效的 NODE_ENV:${process.env.NODE_ENV}`);
// }


// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://learn-a-little.vercel.app"
//     : "http://localhost:3000";
export function getFetchUrl(url: string) {
  // return baseUrl + url;
  return `${
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL!
      : "http://localhost:3000"
  }/${url}`
}