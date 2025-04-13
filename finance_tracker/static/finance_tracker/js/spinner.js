'use_strict';

let spinnerTimeout;

export function showSpinner() {
    const spinner = document.querySelector('.loader-div');
    if (spinner) {
        console.log('spinner loaded');
        spinner.classList.remove('visually-hidden');
    }
}


export function hideSpinner() {
    const spinner = document.querySelector('.loader-div');
    setTimeout(() => {
        if (spinner) {
            spinner.classList.add('visually-hidden');
        }
    }, 500);
}


export function forceHideSpinner() {
    const spinner = document.querySelector('.loader-div');
    if (spinner) {
        clearTimeout(spinnerTimeout);
        spinner.classList.add =('visually-hidden');
    }
}
