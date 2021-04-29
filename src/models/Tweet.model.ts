import Account from './Account.model';
export class Tweet {
  index: number;
  account: Account;
  tweetUrl: string;
  tweetText: string;

  constructor(
    account?: Account,
    tweetText?: string,
    tweetUrl?: string,
    index?: number
  );
  constructor(
    account: Account,
    tweetText: string,
    tweetUrl: string,
    index: number
  ) {
    this.account = account;
    this.tweetText = tweetText;
    this.tweetUrl = tweetUrl;
    this.index = index;
  }
}

export default Tweet;
