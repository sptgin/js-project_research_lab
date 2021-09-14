import './styles.css';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import icons from 'material-design-icons';

import eventsListTemplate from './templates/eventslist.hbs';
import eventCardTemplate from './templates/eventcard.hbs';
import SearchEventsAPI from './apiService';
import * as basicLightbox from 'basiclightbox';
const eventsSearchInput = document.querySelector('#search-form-event');
const eventsSearchCountryInput = document.querySelector('#search-form-country');
const eventsSearchList = document.querySelector('.events');
const eventSearchCard = document.querySelector('.event-card');
const eventsSearchMoreButton = document.querySelector('#search-more');
const eventsSearchAPI = new SearchEventsAPI();

eventsSearchInput.addEventListener('submit', eventsSearch);
eventsSearchMoreButton.addEventListener('click', eventsSearcMore);
eventsSearchList.addEventListener('click', eventsSearchShowFull);

function eventsSearch(event) {
  event.preventDefault();
  eventsSearchListClear();
  eventsSearchAPI.resetPage();
  buttonNoDisplay(eventsSearchMoreButton);
  eventsSearchGetData(eventsSearchInput.firstElementChild.value);
  buttonDisplay(eventsSearchMoreButton);
}

function eventsSearcMore(event) {
  event.preventDefault();
  eventsSearchAPI.incrementPage();
  eventsSearchGetData(eventsSearchInput.firstElementChild.value);
}

function eventsSearchGetData(query) {
  eventsSearchAPI.query = query;
  eventsSearchAPI
    .fetchEvents()
    .then(events => {
      //==========================
      events.forEach(element => {
        console.log(element.name);
        console.log(element.dates.start.localDate);
        console.log(element._embedded.venues[0].name);
        console.log(element.images[0].url);
      });
      //==========================
      if (events.length !== 0) {
        eventsSearchListMake(events);
      } else {
        alert({
          text: 'No matces found !',
          delay: 1000,
        });
      }
    })
    .catch(() => {
      alert({
        text: 'No data for search ...',
        delay: 1000,
      });
    });
}

function eventsSearchListMake(events) {
  eventsSearchList.insertAdjacentHTML(
    'beforeend',
    events.map(eventCardTemplate).map(eventsListTemplate).join(' '),
  );
  if (eventsSearchAPI.page > 1) {
    eventsSearchList.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}

function eventsSearchListClear() {
  eventsSearchList.innerHTML = '';
}

function eventsSearchShowFull(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;
  basicLightbox.create(event.originalTarget.outerHTML).show();
}

function buttonNoDisplay(element) {
  element.classList.remove('button_display');
  element.classList.add('button_nodisplay');
}

function buttonDisplay(element) {
  element.classList.remove('button_nodisplay');
  element.classList.add('button_display');
}
