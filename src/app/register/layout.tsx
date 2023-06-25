import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Register | NextJS + Appwrite Login System",
  description: "This is a NextJS + Appwrite Login System Register Page",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ToastContainer />
        {children}</body>
    </html>
  );
}
