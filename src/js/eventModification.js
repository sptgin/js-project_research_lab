export let arrEvents;
let isRetina;
let card;
const increment = () => card += 1;  

export const eventsModif = (events) => {
  if (!events) {return}
  arrEvents = [];
  card = -1; 
  return events.map(event => {
    const eventNew = {
      city: findCity(event),
      country: findCountry(event),
      idCard: increment(),     
      id: event.id,
      image: findImage(event.images),
      info: event.info ? event.info : '',
      localDate: findLocalDate(event),
      localTime: findLocalTime(event),
      name: event.name ? event.name : '',
      place: findPlace(event),
      priceSt: findPricesBySt(event.priceRanges),
      priceVip: findPricesByVip(event.priceRanges),
      timeZone: findTimeZone(event),
      url: event.url ? event.url : ''
    }
    arrEvents.push(eventNew);
    return eventNew;
  }
  )
}
const findCity = (event) => event._embedded ? event._embedded.venues[0].city.name : 
  event.place ? event.place.city.name : '';

const findCountry = (event) => event._embedded ? event._embedded.venues[0].country.name : 
  event.place ? event.place.country.name : '';

function findImage (images) {
  if (!images) {return}
  const sortByHeight = (imgA, imgB) => (imgB.height) - (imgA.height);
  const imagesSort = images.sort(sortByHeight);
  const chooseImg = isRetina ? imagesSort[0] : imagesSort[1];
  return chooseImg;
};

const findLocalDate = (event) => event.dates.start.localDate ? event.dates.start.localDate : 
  event._embedded ? event._embedded.venues[0].start.localDate : '';

const findLocalTime = (event) => event.dates.start.localTime ? (event.dates.start.localTime).slice(0, 5) : 
  event._embedded.venues[0].start ? (event._embedded.venues[0].start.localTime).slice(0, 5) : '';

const findPlace = (event) => event._embedded ? event._embedded.venues[0].name : 5>8 ? 'hhhhh' : ''

function findPricesBySt (prices) {
  if (!prices) {return ''}
  return prices.find(price => price.type === "standard");
};

function findPricesByVip (prices) {
  if (!prices) {return ''}
  return prices.find(price => price.type === "vip");
};

const findTimeZone = (event) => event.dates.timezone ? event.dates.timezone : 
  event._embedded.venues[0].timezone ? event._embedded.venues[0].timezone : '';

function filterEventsByPriceRangeVip (events) {
  if (!events) {return ''}
  return events
          .filter(event => event.priceRanges
          .some(priceRang => priceRang.type === "vip"))
      
};

// document.addEventListener("DOMContentLoaded", isRetinaScreen);
window.addEventListener("DOMContentLoaded", isRetinaScreen);

function isRetinaScreen(){/*проверка Retina*/
    isRetina = ((window
      .matchMedia && (window
        .matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)')
        .matches || window
        .matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g
        .test(navigator.userAgent);
   }