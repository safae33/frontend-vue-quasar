export class Tweet {
  url: string;
  profilePicUrl: string;
  name: string;
  username: string;
  text: string;

  constructor(
    url?: string,
    profilePicUrl?: string,
    name?: string,
    username?: string,
    text?: string
  );
  constructor(
    url: string,
    profilePicUrl: string,
    name: string,
    username: string,
    text: string
  ) {
    this.url = url;
    this.profilePicUrl = profilePicUrl;
    this.name = name;
    this.username = username;
    this.text = text;
  }
}

export default Tweet;
