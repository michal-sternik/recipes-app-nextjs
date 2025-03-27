
import "./globals.css";
import Header from "@/components/Header/Header";
import { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;

}>) {

  return (
    <html lang="en">
      <body
        className={`
          
          min-h-screen flex flex-col`}
      >
        <SkeletonTheme baseColor="#BBBBBB" highlightColor="#CCCCCC">
          <Toaster position="bottom-left" />

          <Header />
          <div className="flex-1 mx-5">
            {children}
          </div>
        </SkeletonTheme>
      </body>
    </html>
  );
}
