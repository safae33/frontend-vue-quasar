import Account from './Account.model';
import { Tweet } from './Tweet.model';

class TweetGroup {
  index: number;
  tweets: Tweet[] = [];

  accounts: Account[] = [];

  constructor(index?: number, tweet?: Tweet);
  constructor(index: number, tweet: Tweet) {
    this.index = index;
    this.tweets.push(tweet);
  }
}

export default TweetGroup;
