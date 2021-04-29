import Account from 'src/models/Account.model';

import TweetGroup from 'src/models/TweetGroup.model';

export interface GeneralState {
  tweets: TweetGroup[];
  accounts: Account[];
  selectedTweetGroupId: number;
  isSelectedTweetGroup: boolean;
}

function state(): GeneralState {
  return {
    tweets: [],
    selectedTweetGroupId: 0,
    accounts: [],
    isSelectedTweetGroup: false,
  };
}

export default state;
