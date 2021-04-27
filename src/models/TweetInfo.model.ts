import Account from './Account.model';
export class TweetInfo {
  account: Account;
  tweetText: string;
  constructor(account: Account, tweetText: string) {
    this.account = account;
    this.tweetText = tweetText;
  }
}
