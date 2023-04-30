import axios from 'axios';

let totalPages = 0;
const per_page = 40;

async function fetchApi(name, page) {
  const API_KEY = '35922475-10b4d9df5938435aa37377ae0';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: `${name}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  totalPages = response.data.totalHits / per_page;
  return response;
}

export { fetchApi, totalPages };
