import refs from './refs.js';

refs.buttonClose.addEventListener("click", onCloseMainModal);
refs.overlay.addEventListener("click", closeMainModalClickOrESC);
document.addEventListener("keydown", closeMainModalClickOrESC);

export default function onCloseMainModal() {
    refs.overlay.classList.add("is-hidden");
    document.body.classList.remove("overlay-show")
}

function closeMainModalClickOrESC(e) {
    if (e.key === "Escape" || e.currentTarget === e.target) {
    onCloseMainModal();
    }
}