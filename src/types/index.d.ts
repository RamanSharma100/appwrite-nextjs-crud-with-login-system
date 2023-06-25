export type AuthType = {
  userId?: string;
  email: string;
  password: string;
  name?: string;
};

export type ContactType = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  created_by?: string;
};
