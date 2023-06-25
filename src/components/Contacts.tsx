import { useState, type FC, useEffect } from "react";
import { ContactsService } from "../services";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  user: any;
}

const Contacts: FC<Props> = ({ user }) => {
  const contactService = ContactsService.getInstance();

  const [contacts, setContacts] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      contactService.getContacts(user.$id).then(
        (res: any) => {
          setContacts(res.documents);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }, [user]);

  const handleDelete = (id: string, userID: string) => {
    contactService.deleteContact(id, userID).then(
      (res: any) => {
        setContacts(contacts.filter((contact: any) => contact.$id !== id));
        toast.success("Contact deleted successfull!!");
      },
      (err: any) => {
        console.log(err);
        toast.error(err.message);
      }
    );
  };

  return (
    <div className="w-full flex flex-col py-10 items-center justify-center">
      <h1 className="text-7xl font-bold w-full text-center py-5 mb-10">
        Contacts
      </h1>
      <table className="table-auto w-4/5 border-collapse">
        <thead className="bg-black  shadow-md text-white">
          <tr>
            <th className=" px-4 py-5">Name</th>
            <th className=" px-4 py-5">Email</th>
            <th className=" px-4 py-5">Phone</th>
            <th className=" px-4 py-5">Age</th>
            <th className=" px-4 py-5">Actions</th>
          </tr>
        </thead>
        <tbody className="border border-gray-200 divide-y divide-gray-200">
          {!contacts && (
            <tr>
              <td colSpan={5} className=" px-4 py-5">
                No Contacts Found
              </td>
            </tr>
          )}
          {contacts &&
            contacts.map((contact: any) => (
              <tr key={contact.$id}>
                <td className="px-4 py-5 text-center">{contact.name}</td>
                <td className="px-4 py-5 text-center">{contact.email}</td>
                <td className="px-4 py-5 text-center">{contact.phone}</td>
                <td className="px-4 py-5 text-center">{contact.age}</td>
                <td className="gap-3 flex items-center justify-center px-4 py-5 text-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/contact/${contact.$id}/${contact.name}/edit`
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(contact.$id, contact.created_by)
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
