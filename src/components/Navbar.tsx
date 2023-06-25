import Link from "next/link";
import { type FC } from "react";
import { AuthService } from "../services";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  user?: any;
  setUser?: any;
}

const Navbar: FC<NavbarProps> = ({ user, setUser }) => {
  const router = useRouter();
  const authService = AuthService.getInstance();
  return (
    <>
      <ToastContainer />
      <nav className="w-full py-4 bg-black text-white flex items-center justify-between">
        <Link href="/" className="text-lg pl-16 font-bold">
          NextJS + Appwrite CRUD With Login System
        </Link>

        <ul className="flex items-center space-x-4 pr-16">
          {user ? (
            <>
              <li>
                Welcome, <span className="font-bold">{user.name}</span>
              </li>
              <li>
                <Link
                  href="/contact/new"
                  className="text-md text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Contact
                </Link>
              </li>
              <li>
                <button
                  onClick={() =>
                    authService.logoutUser().then(
                      (res: any) => {
                        setUser(null);
                        toast.success("Logout successfull!!");
                        router.push("/");
                      },
                      (err: any) => {
                        console.log(err);
                      }
                    )
                  }
                  className="text-md text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-md text-slate-300 hover:text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-md text-slate-300 hover:text-white"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
