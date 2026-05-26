import localFont from "next/font/local";

export const roboto = localFont({
  src: [{ path: "../../public/fonts/Roboto-VariableFont_wdth,wght.ttf" }],
  weight: "400",
  variable: "--font-roboto",
});
