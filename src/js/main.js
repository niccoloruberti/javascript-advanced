import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
        <div class="card p-3 min-h-15">
          <div>
            <div class="row px-2">
              <div class="col-10">
                <h5 class="col card-title">${book.title}</h5>
              </div>
              <div class="col-2">
                <button data-key="${book.key}" class="info col btn btn-primary"><i class="bi bi-info-circle"></i></button>
              </div>
            </div>
            Authors:
            <ul>
              ${authorsList}
            </ul>
          </div>
          <div class="description description-container hide" id="description-${key}">
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", cardHTML);
  }

  //seleziono tutti i bottoni 'info'
  let infoBtns = document.querySelectorAll(".info");
  //aggiungo un event listener su tutti i bottoni
  infoBtns.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      //controllo le classi che ha l'elemento clickato
      const descriptionElement = document.getElementById(
        `description-${index}`
      );
      //se non contiene la classe 'hide' vuol dire che ho clickato per nasconderlo
      if (!descriptionElement.classList.contains("hide")) {
        descriptionElement.classList.add("hide");
        btn.innerHTML = '<i class="bi bi-info-circle"></i>';
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-primary");
      } else {
        //prendo la chiave del libro
        const key = btn.dataset.key;
        //faccio la chiamata per avere la descrizione del libro
        let description = await getBookDescription(key);
        //tolgo la classe 'hide' e inserisco la descrizione
        descriptionElement.classList.remove("hide");
        //a volte la description arriva come oggetto e si trova all'interno di 'value'
        descriptionElement.innerHTML = description.value
          ? description.value
          : description;
        //modifico l'icona del bottone per nascondere la descrizione
        btn.innerHTML = '<i class="bi bi-x-circle"></i>';
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-secondary");
      }
    });
  });
});
