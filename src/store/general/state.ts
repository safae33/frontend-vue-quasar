import Account from 'src/models/Account.model';
import Tweet from 'src/models/Tweet.model';

import TweetGroup from 'src/models/TweetGroup.model';

export interface GeneralState {
  //auth
  loggedInUser: string;
  token: string | null;
  //dashboard
  tweetGroups: TweetGroup[];
  tweetGroupIdSequence: number;
  tweets: Tweet[];
  accounts: Account[];
  selectedTweetGroupId: number;
  isDragging: boolean;

  //allAccounts
  selectedAccountId: number | null;
  delSelectMode: boolean;
  delSelectedAccountIdArr: number[];
  addAccountTaskId: string;
  addAccountStatus: string;
}

function state(): GeneralState {
  return {
    addAccountTaskId: '',
    addAccountStatus: '',
    loggedInUser: 'Safa Emre YILDIRIM',
    token: '',
    isDragging: false,
    selectedAccountId: null,
    tweetGroups: [],
    //2 olmasının sebebi mock.json da 2 tane tweetgroup olması. sonraki 2 idsini alacak yani
    tweetGroupIdSequence: 2,
    tweets: [],
    accounts: [],
    selectedTweetGroupId: 999999,
    delSelectMode: false,
    delSelectedAccountIdArr: [],
  };
}

export default state;
