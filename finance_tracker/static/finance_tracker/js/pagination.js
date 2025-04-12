'use_strict';

const previousPageBtn = document.querySelector('.previous-page');
const currentPage = document.querySelector('.current-page');
const nextPageBtn = document.querySelector('.next-page');
const paginationDiv = document.querySelector('.pagination-div');

export function showPagination(
  previousURL,
  current,
  nextURL
) {
    paginationDiv.style.display = 'block';
    currentPage.textContent = current
  if (!previousURL) {
    previousPageBtn.classList.add('disabled')
} else {
      previousPageBtn.classList.remove('disabled')
  }
  
    if (!nextURL) {
    previousPageBtn.classList.add('disabled')
} else {
      previousPageBtn.classList.remove('disabled')
  }
}
