import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/style.css";
import { getBookDescription, getBooks } from "./apiCalls.js";

//get the form
const form = document.getElementById("search-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //get the user input
  const searchInput = document.getElementById("search").value;
  //api call to get the books
  const books = await getBooks(searchInput);
  //get the tag where the card of the book will be rendered
  const container = document.getElementById("cards");

  displayBooks(books, container);
  attachEventListeners();
});

// UI FUNCTIONS
/**
 * function that displays the books
 * @param {Array} books
 * @param {DOM element} container
 */
function displayBooks(books, container) {
  container.innerHTML = "";

  Object.keys(books).forEach((key, index) => {
    const book = books[key];
    const cardHTML = renderBookCard(book, index);
    container.insertAdjacentHTML("beforeend", cardHTML);
  });
}

/**
 * function that renders the book card
 * @param {Object} book
 * @param {int} index
 * @returns
 */
function renderBookCard(book, index) {
  const authorsList = book.authors
    .map((author) => `<li>${author.name}</li>`)
    .join("");

  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card p-3 h-100">
        <div>
          <div class="row px-2">
            <div class="col-9">
              <h5 class="card-title mb-0">${book.title}</h5>
            </div>
            <div class="col-3 text-end">
              <button data-key="${book.key}" data-index="${index}" class="info-btn btn btn-primary btn-sm">
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </div>
          <div class="mt-2">
            <strong>Authors:</strong>
            <ul class="mb-0">
              ${authorsList}
            </ul>
          </div>
        </div>
        <div class="description description-container hide mt-2" id="description-${index}">
        </div>
      </div>
    </div>
  `;
}

/**
 * function that change the icon of the button that shows the description
 * @param {DOM element} button
 * @param {boolean} isOpen
 */
function updateButtonIcon(button, isOpen) {
  if (isOpen) {
    button.classList.remove("btn-primary");
    button.classList.add("btn-secondary");
    button.innerHTML = '<i class="bi bi-x-circle"></i>';
  } else {
    button.classList.remove("btn-secondary");
    button.classList.add("btn-primary");
    button.innerHTML = '<i class="bi bi-info-circle"></i>';
  }
}

// LOGIC FUNCTIONS

/**
 * function that toggle the description of the card
 * @param {DOM element} button
 * @param {int} index
 */
async function toggleDescription(button, index) {
  const descriptionElement = document.getElementById(`description-${index}`);
  const isVisible = !descriptionElement.classList.contains("hide");

  if (isVisible) {
    // Hide description
    descriptionElement.classList.add("hide");
    updateButtonIcon(button, false);
  } else {
    // Show description
    const key = button.dataset.key;
    const description = await getBookDescription(key);

    descriptionElement.classList.remove("hide");
    descriptionElement.innerHTML = description.value || description;
    updateButtonIcon(button, true);
  }
}

/**
 * function that set the event listener for the description button
 */
function attachEventListeners() {
  const infoButtons = document.querySelectorAll(".info-btn");

  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      toggleDescription(button, index);
    });
  });
}
