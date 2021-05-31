export interface ICrediantials {
  username: string;
  password: string;
}

export interface IAddAccountTaskId {
  taskId: string;
}

export interface ITweetInfo {
  imgUrl: string;
  username: string;
  name: string;
  text: string;
}

interface IAccountInfo {
  id: number;
  name: string;
  username: string;
  profilePicUrl: string;
}
export interface ICeleryCheckResponse {
  status: string;
  account: null | IAccountInfo;
}
