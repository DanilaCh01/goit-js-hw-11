import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36673095-e5e2632949512909003f8c0e7';

async function fetchImages(q, page, per_page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });

  const response = await axios.get(`${URL}?${searchParams}`);
  return response;
}

export { fetchImages };
