// export default function fetchPictures(query) {
//   const URL = 'https://pixabay.com/api/';
//   const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';
//   const fields = 'image_type=photo&orientation=horizontal&safesearch=true';

//   return fetch(`${URL}?key=${API_KEY}&q=${query}&${fields}`).then(response => {
//     if (!response.ok) {
//       throw new Eroor(`${response.status}`);
//     }
//     return response.json();
//   });
// }

// async function fetchPictures(query) {
//   const URL = 'https://pixabay.com/api/';
//   const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';
//   const fields = 'image_type=photo&orientation=horizontal&safesearch=true';

//   const response = await fetch(
//     `${URL}?key=${API_KEY}&q=${query}&${fields}&per_page`
//   );
//   const pictures = await response.json();

//   return pictures;
// }

// export { fetchPictures };

const URL = 'https://pixabay.com/api/';
const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';
const FIELDS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class FetchPictures {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  getPictures() {
    const url = `${URL}?key=${API_KEY}&q=${this.query}&${FIELDS}&per_page=5&page=${this.page}`;

    return fetch(url).then(response => {
      this.incrementPage();

      return response.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
