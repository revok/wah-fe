import { AxiosInstance } from 'axios';
import { Container, Service } from 'typedi';
import { IEntry } from '../interfaces/entry.interface';
import { IGroupedEntry } from '../interfaces/groupedEntry.interface';


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
}