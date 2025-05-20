'use_strict';

const filterDropdownMenu = document.querySelector('.filter-dropdown-menu')
const filterBadgeTemplate = document.querySelector('[filterButtonTemplate]')



export const getCategories = function (categoryData) {
    categoryData.forEach(categoryName => {
        const element = filterBadgeTemplate.content.cloneNode(true).children[0];
        element.textContent = categoryName
        filterDropdownMenu.append(element)
    });
};

export const clearFilter = function (getCategories) {
    if (getCategories) {
        
    } else {
        clearFilterBtn.classList.add('.hide')
    }
}