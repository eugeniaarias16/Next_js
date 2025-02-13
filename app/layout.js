import "./globals.css";
import NavBar from "components/NavBar";
import { AuthContextProvider } from "actions/AuthContext";


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
