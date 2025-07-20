import { Noto_Sans, Noto_Serif } from "next/font/google";

export const notoSerif = Noto_Serif({
    variable: "--font-noto-serif",
    subsets: ["latin"]
});
export const notoSans = Noto_Sans({
    subsets: ["latin"]
});