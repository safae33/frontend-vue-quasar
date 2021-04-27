export class AccountModel {
  id: number;
  name: string;
  username: string;
  profilePicUrl: string;
  constructor(
    id: number,
    name: string,
    username: string,
    profilePicUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.profilePicUrl = profilePicUrl;
  }
}
