'use_strict';

// Toggle category filters
const filterBtnDiv = document.querySelector('#filtersDiv')
const filterBtn = document.querySelector('.filter-badge')

const filterBadgeContainer = document.querySelector('#filtersDiv')
const filterBadgeTemplate = document.querySelector('[filterButton]')


export const getCategories = function (categoryData) {
    filterBadgeContainer.textContent = '';

    categoryData.forEach(data => {
        const card = filterBadgeTemplate.content.cloneNode(true).children[0];
        const categoryName = card.querySelector('.category-filter-badge')
        
        categoryName.textContent = data

        filterBadgeContainer.append(card)

    });
};

const toggleFilter = function () {
    filterBtnDiv.classList.toggle('hidden')
    if (filterBtnDiv.classList.contains('hidden')) {
        filterBtn.innerHTML = '<i class="bi bi-filter"></i> Filter'
    } else {
        filterBtn.innerHTML = '<i class="bi bi-filter"></i> Hide'
    }
};

export const clearFilters = function (fetchFunction) {
    if (filterBtnDiv.innerHTML.includes('clear')) {
        console.log("Toggled");
        fetchFunction
    }
}

export const filterFunction = function (fetchFunction) {
    const filterToggleBtn = document.querySelector('#toggleFilters')
    filterToggleBtn.addEventListener('click', toggleFilter);
}

