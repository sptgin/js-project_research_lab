import refs from './refs.js';
import onCloseMainModal from './modalClose.js';
import eventServiceApi from './search-API';
import templateCard from '../templates/cardModif.hbs';
import { setPagination } from './pagination.js';
import { authorName } from './modalOpen.js';

refs.buttonMoreFromAuthor.addEventListener('click', searchMoreFromAuthor);

function searchMoreFromAuthor() {
  onCloseMainModal();
  refs.cardsContainer.innerHTML = '';
  
  refs.searchInput.value = authorName;
    eventServiceApi.query = authorName.replaceAll(' ', '%20');
    eventServiceApi.pageReset();
    eventServiceApi.fetchEvent().then(response => {
    refs.cardsContainer.innerHTML = templateCard(response);
    setPagination(eventServiceApi.totalEvents);
    });
  refs.searchInput.value = '';
}
