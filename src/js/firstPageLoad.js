import refs from './refs.js'
import card from '../templates/cardModif.hbs';
import { debounce } from "lodash";
import {setPagination, setEventsOnPage} from './pagination.js';
import { notifyError } from './notify.js';
import eventServiceApi from "./search-API.js";

function firstPageLoad() {
  eventServiceApi.pageReset();
  setEventsOnPage();

  eventServiceApi.fetchEvent()
    .then(events => { 
      refs.cardsContainer.innerHTML = card(events);
      animationCards();
      setPagination(eventServiceApi.totalEvents);
    }).catch(()=>notifyError('Error loading page. Please refresh the page.'))
};
export function animationCards() {
  addClassAnimation();
  setTimeout(removeClassAnimation, 800);
};

function addClassAnimation() {
 const cardsItemAll = document.querySelectorAll('.cards__item')
  cardsItemAll.forEach(cardItem => cardItem.classList.add('cards__item--animation'))
};

function removeClassAnimation() {
 const cardsItemAll= document.querySelectorAll('.cards__item')
  cardsItemAll.forEach(cardItem => {
  cardItem.classList.remove('cards__item--animation')
  cardItem.style.visibility = "visible"
 })
};

window.addEventListener("load", debounce(firstPageLoad, 400));

