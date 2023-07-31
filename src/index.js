import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/fetchImages';
import { getQuery } from './js/getQuery';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.js-target');

const galleryOptions = {
  captionsData: 'alt',
  captionDelay: 250,
};

const simpleLightboxGallery = new SimpleLightbox('.gallery a', galleryOptions);
const observerOptions = {
  root: null,
  rootMargin: '450px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(observerCallback, observerOptions);
let queryToFetch = '';
let currentPage = 0;
let totalImgs;
const perPage = 40;

form.addEventListener('submit', onSearchFormSubmit);

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  input.blur();
  window.scroll({ top: 0 });

  const { searchQuery } = evt.currentTarget.elements;

  if (!searchQuery.value.trim()) {
    return Notify.failure('Search query is empty. Please try again.');
  }

  queryToFetch = getQuery(searchQuery.value);
  currentPage = 1;

  const response = await fetchImages(queryToFetch, currentPage, perPage);
  const { hits, totalHits } = response.data;
  totalImgs = totalHits;

  if (!hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    observer.unobserve(target);  
    return;

  }

  Notify.success(`Hooray! We found ${totalHits} images.`);
  gallery.innerHTML = createMarkup(hits);
  simpleLightboxGallery.refresh();

  if (currentPage * perPage >= totalHits) {
    return;
  }

  observer.observe(target);
}

async function observerCallback(evt) {
  if (!evt[0].isIntersecting) {
    return;
  }

  if (currentPage * perPage >= totalImgs) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    observer.unobserve(target);
    return;
  }

  currentPage += 1;
  const response = await fetchImages(queryToFetch, currentPage, perPage);
  const { hits } = response.data;
  gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  simpleLightboxGallery.refresh();
}
