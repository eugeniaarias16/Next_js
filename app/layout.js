import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "components/NavBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
