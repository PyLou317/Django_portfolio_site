// Toggle category filters
// Change category filter caret
const filter_btn = document.getElementById('toggleFilters')
const filters = document.getElementById('filtersDiv')

const toggleFilter = function () {
    filters.classList.toggle('hidden')

    if (filter_btn.innerHTML === '<i id="category-filter-caret" class="bi bi-caret-right-fill"></i> Filter Categories') {
        filter_btn.innerHTML = '<i id="category-filter-caret" class="bi bi-caret-down-fill"></i> Filter Categories'
    } else {
        filter_btn.innerHTML = '<i id="category-filter-caret" class="bi bi-caret-right-fill"></i> Filter Categories'
    }
};

filter_btn.addEventListener('click', toggleFilter)


