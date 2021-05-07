import Tweet from './Tweet.model';
/**@ Date olan propertyler normalde Date türünde olmalı. şimdilik bu şekil
 * @ type, status string yerine number şeklinde tutulmalı ve yazarken tipin ismini almak gerekiyor. geçiyorum
 */
export class Process {
  id: number;
  type: number;
  createDate: string;
  targetDate: string;
  targetTweet: Tweet;
  status: number;
  statusText: string;

  constructor(
    id?: number,
    type?: number,
    createDate?: string,
    targetDate?: string,
    targetTweet?: Tweet,
    status?: number,
    statusText?: string
  );
  constructor(
    id: number,
    type: number,
    createDate: string,
    targetDate: string,
    targetTweet: Tweet,
    status: number,
    statusText: string
  ) {
    this.id = id;
    this.createDate = createDate;
    this.targetDate = targetDate;
    this.type = type;
    this.targetTweet = targetTweet;
    this.status = status;
    this.statusText = statusText;
  }
}

export default Process;
