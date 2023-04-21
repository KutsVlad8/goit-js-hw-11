export default function fetchPictures(query) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '35615782-928d74ab541d750ac5cbbfeab';
  const fields = 'image_type=photo&orientation=horizontal&safesearch=true';

  return fetch(`${URL}?key=${API_KEY}&q=${query}&${fields}`).then(response => {
    if (!response.ok) {
      throw new Eroor(`${response.status}`);
    }
    return response.json();
  });
}
