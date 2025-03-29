const filter_btn = document.getElementById('filter_btn')
const filters = document.getElementById('category_filters')

const toggleFilters = function () {
    if (filters.classList.contains('hidden')) {
        filters.classList.remove('hidden')
    } else {
        filters.classList.add('hidden')
    }
};

filter_btn.addEventListener('click', toggleFilters)