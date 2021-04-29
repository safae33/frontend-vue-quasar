import Account from './Account.model';
export class Tweet {
  id: number;
  account: Account;
  tweetUrl: string;
  tweetText: string;
  constructor(
    account: Account,
    tweetText: string,
    tweetUrl: string,
    id: number
  ) {
    this.account = account;
    this.tweetText = tweetText;
    this.tweetUrl = tweetUrl;
    this.id = id;
  }
}

export default Tweet;
