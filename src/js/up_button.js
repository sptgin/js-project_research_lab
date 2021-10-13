import refs from "./refs";

refs.buttonUp.addEventListener('click', scrollToTop)
window.addEventListener('scroll', trackScroll);


function trackScroll() {
          let scrolled = window.pageYOffset;
          let coords = document.documentElement.clientHeight;
      
          if (scrolled > coords) {
            refs.buttonUp.classList.add('isActive');
          }
          if (scrolled < coords) {
            refs.buttonUp.classList.remove('isActive');
          }
        }

function scrollToTop() {
refs.buttonUp.classList.remove('isActive');
  refs.searchInput.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
})
}