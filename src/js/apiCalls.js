import axios from "axios";

const url = "https://openlibrary.org";

export async function getBooks(genre) {
  console.log("cerco i libri");

  try {
    const response = await axios.get(url + "/subjects/" + genre + ".json");
    return response.data.works;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookDescription(key) {
  console.log("cerco la descrizione del libro", key);
  try {
    const response = await axios.get(url + key + ".json");
    console.log(response.data.description);
    return response.data.description;
  } catch (error) {
    console.error(error);
  }
}
