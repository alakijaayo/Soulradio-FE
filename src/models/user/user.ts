export interface User {
  username: string;
  id: string;
  userImage: string;
}

export interface NewUser {
  name: string;
}

export interface Users {
  number: number;
  users: NewUser[];
}
