'use_strict';

const previousPage = document.querySelector('.previous-page');
const currentPage = document.querySelector('.current-page');
const nextPage = document.querySelector('.next-page');
const paginationDiv = document.querySelector('.pagination-div');

export function showPagination() {
        paginationDiv.style.display = 'block';
    }