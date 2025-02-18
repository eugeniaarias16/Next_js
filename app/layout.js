import "./globals.css";
import NavBar from "components/NavBar";
import { AuthContextProvider } from "actions/AuthContext";

export const metadata = {
  title: {
    template: "Coder-Commerce - %s",
    default: "Coder-Commerce",
  },
  authors: [{ name: "Eugenia M. Arias" }],
  description: "Ecommerce application made with Next.js, Tailwind CSS and React",
  keywords: "Ecommerce, aplicación, nextjs, tailwind, react,  tailwindcss, Eugenia M. Arias, programadora, argentina, ecommerce"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <AuthContextProvider>
        <NavBar/>
        {children}
      </AuthContextProvider>
      </body>
    </html>
  );
}
