"use client";
import { Form } from "@/src/components";
import Navbar from "@/src/components/Navbar";
import { ContactsService, AuthService } from "@/src/services";
import type { ContactType } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddContactPage = () => {
  const authService = AuthService.getInstance();
  const contactService = ContactsService.getInstance();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);
        (err: any) => {
          console.log(err);
          toast.error("Please login to continue");
          router.push("/login");
          setUser(null);
        };
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Please login to continue");
        router.push("/login");
        setUser(null);
      });
  }, []);

  const handleClick = (e: any, data: ContactType) => {
    e.preventDefault();
    const { name, email, phone, age }: ContactType = data;

    if (!email || !name || !phone || !age) {
      toast.error("Please fill all fields");
      return;
    }

    contactService
      .addContact({
        ...data,
        created_by: user.$id,
      })
      .then(
        (res: any) => {
          toast.success("Contact added successfull!!");
          router.push("/");
        },
        (err: any) => {
          console.log(err);
          toast.error(err.message);
        }
      );
  };
  return (
    <main>
      <Navbar user={user} setUser={setUser} />
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          Add Contact
        </h1>
        <Form
          handleClick={handleClick}
          dataFields={[
            {
              name: "name",
              type: "text",
              placeholder: "Fullyworld Web Tutorials",
            },
            {
              name: "email",
              type: "email",
              placeholder: "test@example.com",
            },
            {
              name: "phone",
              type: "text",
              placeholder: "+91 9999999999",
            },
            {
              name: "age",
              type: "number",
              placeholder: "18",
            },
          ]}
          btnTitle="Add Contact"
        />
      </div>
    </main>
  );
};

export default AddContactPage;
