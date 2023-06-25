import { Databases, ID, Permission, Query, Role } from "appwrite";

import client from "../helpers/appwrite.config";

class ContactsService {
  private static instance: ContactsService;
  private database: Databases = new Databases(client);

  public static getInstance(): ContactsService {
    if (!ContactsService.instance) {
      ContactsService.instance = new ContactsService();
    }

    return ContactsService.instance;
  }

  public getContacts = async (userID: string) => {
    return await this.database.listDocuments(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      [Query.equal("created_by", userID)]
    );
  };

  public addContact = async (data: any) => {
    return await this.database.createDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      ID.unique(),
      data,
      [
        Permission.read(Role.user(data.created_by)),
        Permission.write(Role.user(data.created_by)),
        Permission.update(Role.user(data.created_by)),
        Permission.delete(Role.user(data.created_by)),
      ]
    );
  };

  public getContact = async (id: any) => {
    return await this.database.getDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      id
    );
  };

  public updateContact = async (id: any, data: any) => {
    const isUploadedByUser = await this.database.getDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      id
    );

    if (isUploadedByUser.created_by !== data.created_by) {
      return Promise.reject("You are not allowed to update this contact");
    }

    return await this.database.updateDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      id,
      data
    );
  };

  public deleteContact = async (id: any, userID: string) => {
    const isUploadedByUser = await this.database.getDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      id
    );

    if (isUploadedByUser.created_by !== userID) {
      return Promise.reject("You are not allowed to delete this contact");
    }

    return await this.database.deleteDocument(
      process.env.NEXT_APPWRITE_DB_ID as string,
      process.env.NEXT_APPWRITE_COLLECTION_ID as string,
      id
    );
  };
}

export default ContactsService;
