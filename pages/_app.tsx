import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar, LeftBar, RightBar } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Navbar />
      <div className="w-3/4 mx-auto flex">
        <LeftBar />
        <Component {...pageProps} />
        <RightBar />
      </div>
    </ClerkProvider>
  );
}
