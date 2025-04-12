'use_strict';

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
    }, 500);
}


export function forceHideSpinner() {
    const spinner = document.querySelector('.loader-div');
    if (spinner) {
        clearTimeout(spinnerTimeout);
        spinner.style.display = 'none';
    }
}
