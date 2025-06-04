import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  page = 1;
  clearGallery();

  await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await fetchAndRenderImages(true);
});

async function fetchAndRenderImages(append = false) {
  try {
    showLoader();

    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found. Try a different query.' });
      return;
    }

    createGallery(data.hits);
    totalHits = data.totalHits;

    // Завжди показуємо кнопку "Load More"
    showLoadMoreButton();

    if (append) {
      scrollToNewContent();
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images. Try again later.' });
  } finally {
    hideLoader();
  }
}

function scrollToNewContent() {
  const { height: cardHeight } =
    document.querySelector('.gallery-item').getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}