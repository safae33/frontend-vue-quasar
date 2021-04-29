import Account from 'src/models/Account.model';

import TweetGroup from 'src/models/TweetGroup.model';

export interface GeneralState {
  tweets: TweetGroup[];
  accounts: Account[];
}

function state(): GeneralState {
  return {
    tweets: [],

    accounts: [],
  };
}

export default state;
