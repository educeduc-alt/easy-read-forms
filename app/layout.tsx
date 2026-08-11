import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://next-step-easy-read.educeduc.chatgpt.site"),
  title: "看懂表格｜學生易讀三步驟",
  description: "找到學校表格，再用三張易讀圖卡完成準備、填寫與交件。",
  openGraph: {
    title: "看懂表格｜看懂三步驟",
    description: "找到學校表格，再用固定圖示完成準備、填寫與交件。",
    images: [{ url: "/og.png", width: 1736, height: 909, alt: "好懂下一步：表格三步驟易讀說明" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
