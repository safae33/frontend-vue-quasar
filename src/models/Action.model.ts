export class Action {
  tweetGroupId: number;
  like = false;
  retweet = false;
  constructor(tweetGroupId?: number);
  constructor(tweetGroupId: number) {
    this.tweetGroupId = tweetGroupId;
  }
}

export default Action;
