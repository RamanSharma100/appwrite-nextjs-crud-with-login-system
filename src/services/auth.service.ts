import { Account } from "appwrite";

import client from "../helpers/appwrite.config";
import { AuthType } from "../types";

class AuthService {
  private static instance: AuthService;
  private account: Account = new Account(client);

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public registerUser = async (data: AuthType) => {
    const { email, password, name, userId } = data;
    return this.account.create(
      userId as string,
      email,
      password,
      name as string
    );
  };

  public loginUser = async (data: AuthType) => {
    const { email, password } = data;
    return this.account.createEmailSession(email, password);
  };

  public logoutUser = async () => {
    return this.account.deleteSession("current");
  };

  public getUser = async () => {
    return await this.account.get();
  };
}

export default AuthService;
