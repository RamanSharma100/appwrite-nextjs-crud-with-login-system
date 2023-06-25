"use client";

import { useEffect, useState } from "react";
import { AuthService } from "../services";
import Navbar from "../components/Navbar";
import { Contacts } from "../components";

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);
        (err: any) => {
          console.log(err);
          setUser(null);
        };
      })
      .catch((err: any) => {
        console.log(err);
        setUser(null);
      });
  }, []);
  return (
    <main className="min-h-screen h-screen">
      <Navbar user={user} setUser={setUser} />
      {user ? (
        <div className="w-full flex items-center justify-center">
          <Contacts user={user} />
        </div>
      ) : (
        <h1 className="text-6xl mt-20 w-full flex items-center justify-center font-bold">
          NextJS + Appwrite CRUD
        </h1>
      )}
    </main>
  );
};

export default Home;
