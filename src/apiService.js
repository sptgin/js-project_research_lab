const API_KEY = 'H8Kwuu9G8KhBdezYidcSqsGG75v7WeRv';
const TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

export default class SearchImageAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchEvents() {
    const url = `${BASE_URL}?size=20&keyword=${this.searchQuery}&page=${this.page}&apikey=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(events => {
        console.log(events._embedded.events);
        return events._embedded.event;
      })
      .catch();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
