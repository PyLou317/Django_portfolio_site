'use_strict';

// Toggle category filters
const filterBtnDiv = document.querySelector('#filtersDiv')
const filterBtn = document.querySelector('.category-filter-badge')

const filterBadgeContainer = document.querySelector('#filtersDiv')
const filterBadgeTemplate = document.querySelector('[filterButton]')


export const getCategories = function (categoryData) {
    filterBadgeContainer.innerHTML = '';

    categoryData.forEach(data => {
        const card = filterBadgeTemplate.content.cloneNode(true).children[0];
        const categoryName = card.querySelector('.category-filter-badge')

        categoryName.textContent = data

        filterBadgeContainer.append(card)

    });
};

const toggleFilter = function () {
    filterBtnDiv.classList.toggle('hidden')
};

export const filterFunction = function () {
    const filterToggleBtn = document.querySelector('#toggleFilters')
    filterToggleBtn.addEventListener('click', toggleFilter);
}


