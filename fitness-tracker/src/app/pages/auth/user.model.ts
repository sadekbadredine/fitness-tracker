export interface User {
  email: string;
  userId: string;
}
export class User implements User {
  constructor(public email: string, public userId: string) {}
}
