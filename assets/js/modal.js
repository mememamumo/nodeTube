const modalContainer = document.querySelector(".jsModal");
const overlay = document.querySelector(".modal__overlay");
const modalContent = document.getElementById("jsModalContent");
const closeBtn = document.querySelector(".modal__close");

const formUserNull = document.getElementById("jsUserNull");

function openModal() {
    modalContainer.classList.remove("hidden");
}

function closeModal() {
    modalContainer.classList.add("hidden");
}

function init() {
    if (formUserNull !== null) {
        formUserNull.addEventListener("click", openModal);
    };
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
}

if (modalContainer) {
    init();
}