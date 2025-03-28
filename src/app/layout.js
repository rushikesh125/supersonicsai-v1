// "use client"

import "./globals.css";
import UiProvider from "./components/UiProvider";

import StoreProvider from "./components/StoreProvider";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-poppins", // Define a CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`antialiased font-poppins`}>
        <UiProvider>
          <StoreProvider>{children}</StoreProvider>
          <Toaster/>
          
        </UiProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
