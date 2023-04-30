import { fetchApi, totalPages } from './js/fetchApi';
import { createGalerryMarkup } from './js/galleryMarkup';
import Notiflix from 'notiflix';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

let page = 1;
query = '';

formEL.addEventListener('submit', onFormClick);
btnLoadMoreEl.addEventListener('click', onClickMoreImage);

btnLoadMoreEl.hidden = true;

async function onFormClickaAddGallery() {
  try {
    const response = await fetchApi(query, page);
    if (!response.data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      galleryEl.innerHTML = createGalerryMarkup(response.data.hits);
      btnLoadMoreEl.hidden = false;
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function onClickMoreImageAddGallery() {
  try {
    const response = await fetchApi(query, page);
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalerryMarkup(response.data.hits)
    );
  } catch (error) {}
}

function onFormClick(evt) {
  evt.preventDefault();
  page = 1;
  btnLoadMoreEl.hidden = true;

  query = evt.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  onFormClickaAddGallery();
}

function onClickMoreImage() {
  page += 1;

  if (page > totalPages) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    btnLoadMoreEl.hidden = true;
    return;
  }

  onClickMoreImageAddGallery();
}
