import eventServiceApi from "./search-API";
import refs from "./refs";
import debounce from 'lodash.debounce';
import { notifyInfo } from './notify';
import { apiService } from "./select";

refs.searchInput.addEventListener('input', debounce(onInput, 600));

function onInput(e) {
    if (e.target.value.trim() === '' && eventServiceApi.selectQuery !== "") {
      eventServiceApi.query = "";
      apiService();
      return
    };
    if (e.target.value.trim() === '') {
    eventServiceApi.query = "";
    notifyInfo('Please enter you request!');
    return
    };
    eventServiceApi.query = e.target.value.trim();
    apiService();
};
