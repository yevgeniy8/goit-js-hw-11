// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchApi, totalPages } from './js/fetchApi';
import { createGalerryMarkup } from './js/galleryMarkup';
import Notiflix from 'notiflix';

const formEL = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
// const btnLoadMoreEl = document.querySelector('.load-more');
const guardEl = document.querySelector('.guard');

let page = 1;
query = '';

formEL.addEventListener('submit', onFormClick);
// btnLoadMoreEl.addEventListener('click', onClickMoreImage);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const options = {
  root: null,
  rootMargin: '400px',
  threshold: 0,
};

const observer = new IntersectionObserver(onPaginationObserver, options);

// btnLoadMoreEl.hidden = true;

async function onFormClickaAddGallery() {
  try {
    const response = await fetchApi(query, page);
    if (!response.data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      galleryEl.innerHTML = createGalerryMarkup(response.data.hits);
    //   btnLoadMoreEl.hidden = false;
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
      observer.observe(guardEl);
      lightbox.refresh();
    }
  } catch (error) {
    console.log(error);
  }
}

// async function onClickMoreImageAddGallery() {
//   try {
//     scroll();
//     const response = await fetchApi(query, page);
//     galleryEl.insertAdjacentHTML(
//       'beforeend',
//       createGalerryMarkup(response.data.hits)
//     );
//     lightbox.refresh();
//   } catch (error) {}
// }

function onFormClick(evt) {
  evt.preventDefault();
  page = 1;
//   btnLoadMoreEl.hidden = true;

  query = evt.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  onFormClickaAddGallery();
}

// function onClickMoreImage() {
//   page += 1;
//   onClickMoreImageAddGallery();

//   if (page === totalPages) {
//     Notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     btnLoadMoreEl.hidden = true;
//     return;
//   }
// }

function scroll() {
  if (!galleryEl.firstElementChild) {
    return;
  } else {
    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

async function onPaginationObserverGalleryMarkup() {
  try {
    scroll();
    const response = await fetchApi(query, page);
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalerryMarkup(response.data.hits)
    );
    lightbox.refresh();

    if (page > totalPages) {
      //     evt.target.classList.add('btn-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {}
}

function onPaginationObserver(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;
      onPaginationObserverGalleryMarkup();
      if (page === totalPages) {
        observer.unobserve(guardEl);
      }
    }
  });
}
