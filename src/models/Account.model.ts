import { Action } from './Action.model';

export class Account {
  id: number;
  name: string;
  username: string;
  profilePicUrl: string;
  /**bunun boş olmama sebebi de mockdaki groupları atamak için */
  actions: Action[] = [new Action(0), new Action(1)];

  constructor(
    id?: number,
    name?: string,
    username?: string,
    profilePicUrl?: string
  );
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

export default Account;
