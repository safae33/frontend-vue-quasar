import { Action } from './Action.model';
import { Process } from './Process.model';

export class Account {
  id: number;
  name: string;
  username: string;
  profilePicUrl: string;
  /**bunun boş olmama sebebi de mockdaki groupları atamak için */
  actions: Action[] = [new Action(0), new Action(1), new Action(999999)];
  processes: Process[] = [];

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
