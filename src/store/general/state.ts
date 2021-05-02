import Account from 'src/models/Account.model';
import Tweet from 'src/models/Tweet.model';

import TweetGroup from 'src/models/TweetGroup.model';

export interface GeneralState {
  tweets: TweetGroup[];
  accounts: Account[];
  selectedTweetGroupId: number;
  isSelectedTweetGroup: boolean;
  splicedTweet: Tweet;
}

function state(): GeneralState {
  return {
    splicedTweet: new Tweet(),
    tweets: [],
    selectedTweetGroupId: 9999,
    accounts: [],
    isSelectedTweetGroup: false,
  };
}

export default state;
