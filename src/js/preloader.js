import refs from './refs';
import { debounce } from "lodash";
import {addClassAnimation, removeClassAnimation} from "./firstPageLoad";
window.onload = function () {
    setTimeout(() => {
      hideLoader();
    }, 500);
  };
  
function showLoader() {
    refs.preloader.classList.remove('visually-hidden');
};

function hideLoader() {
    refs.preloader.classList.add('visually-hidden');
};

export {showLoader, hideLoader}
