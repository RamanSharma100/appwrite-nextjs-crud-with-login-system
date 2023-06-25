"use client";
import { Form } from "@/src/components";
import Navbar from "@/src/components/Navbar";
import { ContactsService, AuthService } from "@/src/services";
import type { ContactType } from "@/src/types";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditContactPage = () => {
  const authService = AuthService.getInstance();
  const contactService = ContactsService.getInstance();
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    authService
      .getUser()
      .then((res: any) => {
        setUser(res);
        contactService
          .getContact(id)
          .then(
            (res: any) => {
              console.log(res);
              setData({
                name: res.name,
                email: res.email,
                age: res.age,
                phone: res.phone,
                id: res.$id,
                created_by: res.created_by,
              });
              setLoading(false);
            },
            (err: any) => {
              console.log(err);
              setLoading(false);
            }
          )
          .catch((err: any) => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
          });
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
      .updateContact(id, {
        name: data.name,
        email: data.email,
        age: data.age,
        phone: data.phone,
        created_by: data.created_by,
      })
      .then(
        (res: any) => {
          toast.success("Contact updated successfully!!");
          router.push("/");
        },
        (err: any) => {
          console.log(err);
          toast.error(err.message);
        }
      );
  };

  if (loading) {
    return (
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <Navbar user={user} setUser={setUser} />
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!data)
    return (
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <Navbar user={user} setUser={setUser} />
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          NO DATA FOUND
        </h1>
      </div>
    );

  return (
    <main>
      <Navbar user={user} setUser={setUser} />
      <div className="h-screen w-full py-10 flex flex-col items-center gap-10">
        <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
          Edit Contact
        </h1>

        <Form
          handleClick={handleClick}
          data={data}
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
          btnTitle="Update Contact"
        />
      </div>
    </main>
  );
};

export default EditContactPage;
