import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edit Contact | NextJS + Appwrite Login System",
  description: "This is a NextJS + Appwrite Login System Edit Contact",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}
