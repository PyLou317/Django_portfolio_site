'use_strict';

const pageData = document.querySelector('[transaction-row-container]')

let spinnerTimeout;

export function showSpinner() {
    const spinner = document.querySelector('.loader-div');
    if (spinner) {
        console.log('spinner loaded');
        spinner.style.display = 'flex';
    }
}


export function hideSpinner() {
    const spinner = document.querySelector('.loader-div');
    setTimeout(() => {
        if (spinner) {
            spinner.style.display = 'none';
        }
        if (pageData) {
            pageData.style.display = 'relative';
        }
    }, 1000);
}


export function forceHideSpinner() {
    const spinner = document.querySelector('.loader-div');
    if (spinner) {
        clearTimeout(spinnerTimeout);
        spinner.classList.add =('visually-hidden');
    }
}
