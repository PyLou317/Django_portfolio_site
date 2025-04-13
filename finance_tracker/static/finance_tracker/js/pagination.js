'use_strict';

export function setupPagination(data) {
  const previousPageElement = document.querySelector('.previous-page');
  const nextPageElement = document.querySelector('.next-page');
  const currentPageElement = document.querySelector('.current-page');

  const paginationDiv = document.querySelector('.pagination-div');

  const previousPageLink = document.querySelector('.previousUrl');
  const nextPageLink = document.querySelector('.nextUrl');

  currentPageElement.textContent = data.current_page;

  paginationDiv.style.display = 'block';
  if (data.previous) {
    previousPageLink.setAttribute('href', data.previous);
    previousPageElement.classList.remove('disabled');
  } else {
    previousPageElement.classList.add('disabled');
  }

  if (data.next) {
    nextPageLink.setAttribute('href', data.next);
    nextPageElement.classList.remove('disabled');
  } else {
    nextPageElement.classList.add('disabled');
  }
}
