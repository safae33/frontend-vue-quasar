export class Account {
  id: number;
  name: string;
  username: string;
  profilePicUrl: string;
  like: boolean;
  retweet: boolean;
  constructor(
    id: number,
    name: string,
    username: string,
    profilePicUrl: string,
    like: boolean,
    retweet: boolean
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.profilePicUrl = profilePicUrl;
    this.like = like;
    this.retweet = retweet;
  }
}

export default Account;
