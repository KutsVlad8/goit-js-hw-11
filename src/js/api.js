import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';
const FIELDS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class FetchPictures {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  async getPictures() {
    const url = `${URL}?key=${API_KEY}&q=${this.query}&${FIELDS}&per_page=40&page=${this.page}`;
    const response = await fetch(url);
    const pictures = await response.json();

    return pictures;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

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
