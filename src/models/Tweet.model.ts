import Account from './Account.model';
export class Tweet {
  account: Account;
  tweetUrl: string;
  tweetText: string;

  constructor(account?: Account, tweetText?: string, tweetUrl?: string);
  constructor(account: Account, tweetText: string, tweetUrl: string) {
    this.account = account;
    this.tweetText = tweetText;
    this.tweetUrl = tweetUrl;
  }
}

export default Tweet;
