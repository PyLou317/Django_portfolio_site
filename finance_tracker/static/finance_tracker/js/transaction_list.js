// Toggle category filters
const filter_btn = document.getElementById('toggleFilters')
const filters = document.getElementById('filtersDiv')

const toggleFilter = function () {
    filters.classList.toggle('hidden')
};

filter_btn.addEventListener('click', toggleFilter)


