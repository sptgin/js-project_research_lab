import axios from 'axios';
import { notifyAlert, notifyError, notifyInfo, notifySuccess} from './notify.js';
import { eventsModif } from './eventModification.js';

const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';
const KEY = 'y2gr3zDEoAnck6YziFkTdrHptQULpZRO';
class EventServiceApi {
  constructor() {
    this.page = 0;
    this.totalPages = '';
    this.searchQuery = '';
    this.countryQuery = '';
    this.eventId = '';
    this.totalEvents = '';
    this.size = 20;
  }

  fetchEvent() {
    if (window.outerWidth >= 768 && window.outerWidth < 1280) {
      this.size = 21;
    }
    const url = `${ROOT_URL}events.json?&size=${this.size}&page=${this.page}&keyword=${this.searchQuery}&countryCode=${this.countryQuery}&apikey=${KEY}`;

    return axios
      .get(url)
      .then(result => {
        try {
          this.totalEvents = result.data.page.totalElements;
          this.totalPages = result.data.page.totalPages; 
          return eventsModif(result.data._embedded.events);
        } catch (e) {}
      })
      .catch(err => notifyError(err));
  }

  async searchEventById() {
    try {
      const result = await axios.get(`${ROOT_URL}events/${this.eventId}?apikey=${KEY}`);
      const data = await result.data; 
      const arrEvt = await eventsModif([data]); 
      return (arrEvt[0]);
    } catch (err) {notifyError(err)}
  }

  pageReset() {
    this.page = 0;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get selectQuery() {
    return this.countryQuery;
  }
  set selectQuery(newSelectQuery) {
    this.countryQuery = newSelectQuery;
  }

  get queryId() {
    return this.eventId;
  }
  set queryId(newId) {
    this.eventId = newId;
  }
}
const eventServiceApi = new EventServiceApi();
export default eventServiceApi;
