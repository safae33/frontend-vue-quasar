class TweetGroup {
  id: number;
  tweets: number[] = [];

  constructor(id?: number, tweetIndex?: number);
  constructor(id: number, tweetIndex: number) {
    this.id = id;
    this.tweets.push(tweetIndex);
  }
}

export default TweetGroup;
