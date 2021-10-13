import CustomSelect from './custom-select';
import { setPagination } from './pagination.js';
import eventServiceApi from "./search-API";
import templateCard from "../templates/cardModif.hbs";
import refs from "./refs";
import {notifyAlert} from './notify.js';
import {animationCards} from "./firstPageLoad";

const select = new CustomSelect('#select', {
  name: 'country',
  targetValue: '',
  options: [
    ['US', 'USA'],
    ['AD', 'Andorra'],
    ['AI', 'Anguilla'],
    ['AR', 'Argentina'],
    ['AT', 'Austria'],
    ['AZ', 'Azerbaijan'],
    ['BS', 'Bahamas'],
    ['BS', 'Bahamas'],
    ['BH', 'Bahrain'],
    ['BB', 'Barbados'],
    ['BE', 'Belgium'],
    ['BM', 'Bermuda'],
    ['BR', 'Brazil'],
    ['BG', 'Bulgaria'],
    ['CA', 'Canada'],
    ['CL', 'Chile'],
    ['CN', 'China'],
    ['CO', 'Colombia'],
    ['CR', 'Costa Rica'],
    ['HR', 'Croatia'],
    ['CY', 'Cyprus'],
    ['CZ', 'Czech Republic'],
    ['DK', 'Denmark'],
    ['DO', 'Dominican Republic'],
    ['EC', 'Ecuador'],
    ['EE', 'Estonia'],
    ['FO', 'Faroe Islands'],
    ['FI', 'Finland'],
    ['FR', 'France'],
    ['GE', 'Georgia'],
    ['DE', 'Germany'],
    ['GH', 'Ghana'],
    ['GI', 'Gibraltar'],
    ['GB', 'Great Britain'],
    ['GR', 'Greece'],
    ['HK', 'Hong Kong'],
    ['HU', 'Hungary'],
    ['IS', 'Iceland'],
    ['IN', 'India'],
    ['IE', 'Ireland'],
    ['IL', 'Israel'],
    ['IT', 'Italy'],
    ['JM', 'Jamaica'],
    ['JP', 'Japan'],
    ['KR', 'Korea, Republic of'],
    ['LV', 'Latvia'],
    ['LB', 'Lebanon'],
    ['LT', 'Lithuania'],
    ['LU', 'Luxembourg'],
    ['MY', 'Malaysia'],
    ['MT', 'Malta'],
    ['MX', 'Mexico'],
    ['MC', 'Monaco'],
    ['ME', 'Montenegro'],
    ['MA', 'Morocco'],
    ['NL', 'Netherlands'],
    ['AN', 'Netherlands Antilles'],
    ['NZ', 'New Zealand'],
    ['ND', 'Northern Ireland'],
    ['NO', 'Norway'],
    ['PE', 'Peru'],
    ['PL', 'Poland'],
    ['PT', 'Portugal'],
    ['RO', 'Romania'],
    ['RU', 'Russian Federation'],
    ['LC', 'Saint Lucia'],
    ['SA', 'Saudi Arabia'],
    ['RS', 'Serbia'],
    ['SG', 'Singapore'],
    ['SK', 'Slovakia'],
    ['SI', 'Slovenia'],
    ['ZA', 'South Africa'],
    ['ES', 'Spain'],
    ['SE', 'Sweden'],
    ['CH', 'Switzerland'],
    ['TW', 'Taiwan'],
    ['TH', 'Thailand'],
    ['TT', 'Trinidad and Tobago'],
    ['TR', 'Turkey'],
    ['UA', 'Ukraine'],
    ['AE', 'United Arab Emirates'],
    ['UY', 'Uruguay'],
    ['VE', 'Venezuela']],
  });

document.querySelector('.select').addEventListener('select.change', onSelect);
  
const input = document.querySelector('#select__input');
const selectSh = document.querySelector('#select');
const selectItems = document.querySelectorAll('.country__item');
  
function onSelect (e) {
  const select = e.target.querySelector('.select__toggle');
  eventServiceApi.selectQuery = select.dataset.value;

  if (eventServiceApi.searchQuery === '') {
      eventServiceApi.pageReset();
    apiService();
    return
  }
    if (eventServiceApi.searchQuery !== '') {
      eventServiceApi.pageReset();

      apiService();
      return
   } 
    apiService ();
};

function onEmptySelect () {
    eventServiceApi.selectQuery = input.dataset.value; 
    apiService ();
}



input.addEventListener('keyup', filter);

function filter(evt) {
    evt.preventDefault();
    const inputValue = input.value.toUpperCase();
        selectItems.forEach(
      function getMatch(item) {
      const itemContent = item.innerHTML.toUpperCase();
        if (itemContent.includes(inputValue)) {
          selectSh.classList.add('select_show');
          item.classList.add('select__item-show');
          item.classList.remove('select__item-hide');
        }
        else {
          selectSh.classList.add('select_show');
          item.classList.add('select__item-hide');
          item.classList.remove('select__item-show');
        }
        if (inputValue === null, inputValue === "") {
          item.classList.remove('select__item-show');
          item.classList.remove('select__item-show');
        }
      }
    )
    if (inputValue === null, inputValue === "") {
        const remSelected = document.querySelector('.select__option_selected');
        if (remSelected){
        remSelected.classList.remove('select__option_selected');
       }
          input.dataset.value = "";
         onEmptySelect();
    }
    else{
      return
    }
};

export function apiService() {
  eventServiceApi.fetchEvent().then(events => {
    if (events === undefined) {
      eventServiceApi.pageReset();
      setPagination(eventServiceApi.totalEvents);
      notifyAlert('Looks like there is no such even!');
      return
    }
    refs.cardsContainer.innerHTML = templateCard(events);
    animationCards();
    setPagination(eventServiceApi.totalEvents);
  });
}
