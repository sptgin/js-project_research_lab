import refs from './refs.js';
import eventMarkup from '../templates/eventModif.hbs';
import eventServiceApi from './search-API.js';
import { arrEvents } from './eventModification.js';

export let authorName;

refs.cardsContainer.addEventListener('click', OnEventClick);

function renderEventMarkup (event) {
    showModal();
    refs.modalContent.innerHTML = eventMarkup(event);

    authorName = event.name;
}

function showModal () {
    refs.overlay.classList.remove("is-hidden");
    document.body.classList.add("overlay-show");
}
    
function OnEventClick (evt) {
    const target = evt.target.nodeName !== 'LI' ? evt.target.parentElement : evt.target;
    if (target.nodeName !== "LI") return;
    
    const idCard = Number(target.dataset.id);
    
    renderEventMarkup(arrEvents[idCard])
};