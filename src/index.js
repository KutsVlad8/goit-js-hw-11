import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import LoadMoreBtn from './js/loadMoreBtn';
import FetchPictures from './js/api';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const fetchPictures = new FetchPictures();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

searchForm.addEventListener('submit', onSubmitForm);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSubmitForm(event) {
  event.preventDefault();
  loadMoreBtn.show();

  const formElements = event.currentTarget.elements;
  const searchQuery = formElements.searchQuery.value;
  fetchPictures.query = searchQuery;

  fetchPictures.resetPage();

  clearMarkup();
  onLoadMore();

  // try {
  //   const pictures = await fetchPictures(searchQuery);
  //   createCard(pictures);
  // } catch (error) {
  //   if (error.message === '404') {
  //     Notiflix.Notify.failure('Not found image ');
  //   }
  // }
}

function onLoadMore() {
  loadMoreBtn.disable();
  return fetchCardMarkup()
    .then(markup => {
      updateMarkup(markup);
      loadMoreBtn.enable();
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Not found image ');
      }
    });
}

function fetchCardMarkup() {
  return fetchPictures.getPictures().then(({ hits }) => {
    if (hits.length === 0) {
      Notiflix.Notify.failure('Oops, there is no image with that name');
      loadMoreBtn.hide();
    }

    const createCard = hits.reduce(
      (markup, card) => markup + createMarkup(card),
      ''
    );
    return createCard;
  });
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="100%"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>`;
}

function updateMarkup(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  gallery.innerHTML = '';
}

// function createCard({ hits }) {
//   if (hits.length === 0) {
//     Notiflix.Notify.failure('Oops, there is no image with that name');
//   }

//   const createCard = hits.reduce(
//     (markup, card) => markup + createMarkup(card),
//     ''
//   );

// gallery.innerHTML = createCard;
// }
