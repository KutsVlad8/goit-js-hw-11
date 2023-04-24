import './css/styles.css';
import Notiflix from 'notiflix';
import LoadMoreBtn from './js/loadMoreBtn';
import FetchPictures from './js/api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

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
  loadMoreBtn.disable();
  clearMarkup();

  const formElements = event.currentTarget.elements;
  const searchQuery = formElements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.failure('Oops, the search box is blank');
    return;
  }
  fetchPictures.query = searchQuery;

  fetchPictures.resetPage();

  fetchPictures.getPictures().then(({ hits, totalHits }) => {
    if (hits.length === 0) {
      Notiflix.Notify.failure('Oops, there is no image with that name');
      loadMoreBtn.disable();
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    if (hits.length === totalHits) {
      setTimeout(() => {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }, 1500);
      const createCard = hits.reduce(
        (markup, card) => markup + createMarkup(card),
        ''
      );
      loadMoreBtn.hide();
      updateMarkup(createCard);
      fetchPictures.incrementPage();
      return;
    }

    const createCard = hits.reduce(
      (markup, card) => markup + createMarkup(card),
      ''
    );

    loadMoreBtn.enable();
    updateMarkup(createCard);
    fetchPictures.incrementPage();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();

  fetchPictures.getPictures().then(({ hits, totalHits }) => {
    if (40 + hits.length === totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      const createCard = hits.reduce(
        (markup, card) => markup + createMarkup(card),
        ''
      );
      loadMoreBtn.hide();
      updateMarkup(createCard);
      fetchPictures.incrementPage();
      return;
    }
    const createCard = hits.reduce(
      (markup, card) => markup + createMarkup(card),
      ''
    );

    loadMoreBtn.enable();
    updateMarkup(createCard);
    fetchPictures.incrementPage();
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
   <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" "/>  
   </a>
  
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
  const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function clearMarkup() {
  gallery.innerHTML = '';
}
