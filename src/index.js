import './styles.css';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import icons from 'material-design-icons';

import imageSearchFormTemplate from './templates/imagesearchform.hbs';
import imagesListTemplate from './templates/imagegallery.hbs';
import imageCardTemplate from './templates/imagecard.hbs';
import SearchImageAPI from './apiService';
import * as basicLightbox from 'basiclightbox';
const imageSearchInput = document.querySelector('#search-form');
const imageSearchList = document.querySelector('.gallery');
const imageSearchCard = document.querySelector('.photo-card');
const imageSearchMoreButton = document.querySelector('#search-more');
const imageSearchAPI = new SearchImageAPI();

imageSearchInput.addEventListener('submit', imageSearch);
imageSearchMoreButton.addEventListener('click', imageSearcMore);
imageSearchList.addEventListener('click', imageSearchShowFull);

function imageSearch(event) {
  event.preventDefault();
  imageSearchListClear();
  imageSearchAPI.resetPage();
  buttonNoDisplay(imageSearchMoreButton);
  imageSearchGetData(imageSearchInput.firstElementChild.value);
  buttonDisplay(imageSearchMoreButton);
}

function imageSearcMore(event) {
  event.preventDefault();
  imageSearchAPI.incrementPage();
  imageSearchGetData(imageSearchInput.firstElementChild.value);
}

function imageSearchGetData(query) {
  imageSearchAPI.query = query;
  imageSearchAPI
    .fetchImages()
    .then(images => {
      if (images.length !== 0) {
        imageSearchListMake(images);
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

function imageSearchListMake(images) {
  imageSearchList.insertAdjacentHTML(
    'beforeend',
    images.map(imageCardTemplate).map(imagesListTemplate).join(' '),
  );
  if (imageSearchAPI.page > 1) {
    imageSearchList.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
}

function imageSearchListClear() {
  imageSearchList.innerHTML = '';
}

function imageSearchShowFull(event) {
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
