import { AxiosInstance, AxiosResponse } from 'axios';
import { Container, Service } from 'typedi';
import { IEntry } from '../interfaces/entry.interface';
import { IGroupedEntry } from '../interfaces/groupedEntry.interface';
import { IUser } from '../interfaces/user.interface';


@Service()
export default class ApiService {

  /**
   * Retrieve API service singleton from DI container.
   * @returns AxiosInstance
   */
  private _getApiService(): AxiosInstance {
    return Container.get('apiInstance') as AxiosInstance;
  }


  /**
   * Post a new survey entry to the API.
   * 
   * @param value 
   * @returns IEntry
   */
  postEntry(value: number): Promise<IEntry> {
    const api = this._getApiService();

    if (api) {
      let request = '/entry/new';

      return api
        .post(request, {value})
        .then((res) => {

          if (res.data) {
            const lastSubmit = res.data.createdAt;
            localStorage.setItem('lastSubmit', lastSubmit);
          }

          return res.data;
        });
    } else {
      return Promise.reject();
    }
  }

  /**
   * Retrieve entries from storage.
   * @param granularity {string} year/month/day or empty.
   * @returns An array of IEntry objects.
   */
  getEntries(granularity ?: string): Promise<IEntry[]> {

    const api = this._getApiService();

    if (api) {
      let request = '/entry';
      if (granularity) {
        request += `?granularity=${granularity}`;
      }

      return api.get(request).then((d) => d.data);
    } else {
      return Promise.reject();
    }
  }

  /**
   * Essentially the same function as getEntries(), but
   * groups the data by value to make it suitable for piechart visualisation.
   * @param granularity {string} year/month/day or empty.
   * @returns An array of aggregated entries (grouped by value).
   */
  getGroupedData(granularity ?: string): Promise<IGroupedEntry[]> {
    const api = this._getApiService();

    if (api) {
      let request = '/entry/grouped';
      if (granularity) {
        request += `?granularity=${granularity}`;
      }

      return api.get(request).then((d) => {
        let result = d.data;

        if (Array.isArray(result)) {
          result = result
            .map((e) => {
              let translatedLabel;

              switch (`${e.name}`) {
                case "0":
                  translatedLabel = 'bad';
                  e.color = 'red';
                  break;
                case "1":
                  translatedLabel = 'neutral';
                  e.color = 'blue';
                  break;
                case "2":
                  translatedLabel = 'good';
                  e.color = 'green';
                  break;
              }

              return {
                ...e,
                name: translatedLabel
              };
            })
            .sort((a, b) => a.name - b.name)
        }

        return result;
      });
    } else {
      return Promise.reject();
    }
  }

  /**
   * Login a user (will set the token in localstorage)
   * @returns payload with jwt token.
   */
  authenticateUser (user: IUser): Promise<IUser> {
    const api = this._getApiService();

    if (api) {
      return api.post('/user/login', { username: user.username, password: user.password })
      .then((response: AxiosResponse) => {
        if (response.data && response.data['token']) {
          localStorage.setItem('token', response.data['token']);
          window.dispatchEvent( new Event('storage') );
        }

        return response.data;
      });
    } else {
      return Promise.reject();
    }
  }

  /**
   * Validate a token. (used to guard routes)
   * Token will be sent automatically through axios interceptor.
   * @returns jwt token.
   */
  validateToken (): Promise<boolean> {
    const api = this._getApiService();

    if (api) {
      return api.get('user/validateToken')
        .then((response: AxiosResponse) => {
          return response.status === 200;
        });
    } else {
      return Promise.reject();
    }
  }
}