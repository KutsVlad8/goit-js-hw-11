import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import fetchPictures from './api';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const formElements = event.currentTarget.elements;
  const searchQuery = formElements.searchQuery.value;

  fetchPictures(searchQuery)
    .then(createCard)
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no image with that name');
      }
    });
}

function createCard({ hits }) {
  if (hits.length === 0) {
    Notiflix.Notify.failure('Not found image');
  }

  const createCard = hits.reduce(
    (markup, card) => markup + createMarkup(card),
    ''
  );

  gallery.innerHTML = createCard;
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
        <b>Likes</b>: ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>: ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>: ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>: ${downloads}
      </p>
    </div>
  </div>`;
}
