const API_KEY = '5018958-ed49ccd90878e6614abdf24a6';
const TYPE = 'image_type=photo';
const ORIENTATION = 'orientation=horizontal';
const BASE_URL = 'https://pixabay.com/api/';

export default class SearchImageAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?${TYPE}&${ORIENTATION}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(images => {
        return images.hits;
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
