import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import { getBookDescription, getBooks } from "./apiCalls.js";

const form = document.getElementById("search-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchInput = document.getElementById("search").value;
  console.log("input", searchInput);

  let books = await getBooks(searchInput);
  const bookKeys = Object.keys(books);
  const container = document.getElementById("cards");

  container.innerHTML = "";

  // Use for...of instead of forEach
  for (let key of bookKeys) {
    let book = books[key];
    console.log("book", book);

    // Create authors list HTML
    let authorsList = book.authors
      .map((author) => `<li>${author.name}</li>`)
      .join("");

    const cardHTML = `
      <div class="col-3 my-2">
        <div class="card p-3 h-100">
          <div class="info" id="info-${key}" data-key="${book.key}">
            <h5 class="card-title">${book.title}</h5>
            Authors:
            <ul>
              ${authorsList}
            </ul>
          </div>
          <div class="description hide" id="description-${key}">
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", cardHTML);
  }

  // Now we proceed to adding event listeners
  let infoContainers = document.querySelectorAll(".info");

  infoContainers.forEach((info, index) => {
    info.addEventListener("click", async () => {
      const key = info.dataset.key;
      console.log("key", key);
      let description = await getBookDescription(key);
      info.classList.add("hide");
      console.log("index", info.getAttribute("id"));
      //sistemare questa parte usando index
      const descriptionElement = document.getElementById(`info-${index}`);
      console.log("element", descriptionElement);

      if (descriptionElement) {
        descriptionElement.classList.remove("hide");
        if (description.value) {
          descriptionElement.innerHTML = description.value;
        } else {
          descriptionElement.innerHTML = description;
        }
      } else {
        console.error(`Element with id description - ${key} not found`);
      }
    });
  });
});
