import { api } from 'boot/axios';
// import { computed, ComputedRef } from 'vue';
import { useQuasar } from 'quasar';

import StoreClass from 'src/services/mockService';
import {
  ICrediantials,
  ITweetInfo,
  IAddAccountTaskId,
  ICeleryCheckResponse,
} from 'src//models/interfaces';
import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import Account from 'src/models/Account.model';

export default class Axios {
  store = new StoreClass();
  q = useQuasar();

  //////////////////////////////// Auth
  async login(crediantials: ICrediantials) {
    const params = new URLSearchParams();
    params.append('username', crediantials.username);
    params.append('password', crediantials.password);
    await api
      .post('/auth/login', params)
      .then((response: AxiosResponse<string>) => {
        this.store.setToken(response.data);
        LocalStorage.set('token', response.data);
        api.defaults.headers.common = {
          Authorization: `bearer ${response.data}`,
        };
      });
  }
  async logout(token: string) {
    await api.post('/auth/logout', { token: token });
  }
  //////////////////////////////// Dashboard
  async getAccounts() {
    await api
      .get('/twitter/getaccounts')
      .then((response: AxiosResponse<string>) => {
        console.log(response.data);
        this.q.notify({
          type: 'myType',
          message: 'Giriş yapıldı. bu da token :  ' + response.data,
          timeout: 400,
          position: 'top-right',
        });
      });
  }

  async add_new_account(credentials: ICrediantials) {
    console.log(JSON.stringify(credentials));
    await api
      .post('/twitter/newAccount', JSON.stringify(credentials))
      .then((response: AxiosResponse<IAddAccountTaskId>) => {
        this.store.setAddAccountTaskId(response.data.taskId);
      });
  }

  async check_task_id_status(taskId: string) {
    await api
      .post('/twitter/checkCelery', { taskId: taskId })
      .then((response: AxiosResponse<ICeleryCheckResponse>) => {
        this.store.setAddAccountStatus(response.data.status);
        if (response.data.status == 'SUCCESS') {
          this.store.addActionsForNewAccountAndPushToAccounts(
            Object.assign(new Account(), response.data.account)
          );
        }
      });
  }

  async add_tweet_info(url: string) {
    await api
      .post('/twitter/getTweetInfo', { url: url.slice(20) })
      .then((response: AxiosResponse<ITweetInfo>) => {
        console.log('RESPONSEEE DATAAAAAA :   ', response.data);
        this.store.addNewTweet(response.data);
      });
  }

  async test() {
    await api.get('/checkCelerytestttttttt').then((response) => {
      console.log('RESPONSEEE DATAAAAAA :   ', response.data);
    });
  }
}
