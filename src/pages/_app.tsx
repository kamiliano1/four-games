import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Space_Grotesk } from "next/font/google";

const spaceGretesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-Grotesk",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className={`${spaceGretesk.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
