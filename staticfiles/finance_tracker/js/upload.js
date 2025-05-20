// Error handling for CSV file type only
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('id_file');
    const fileInputErrorDiv = document.getElementById('fileTypeError');
    console.log('Script Loaded')

    fileInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.csv')) {
                fileInputErrorDiv.textContent = 'Please upload a CSV (.csv) file.';
                fileInputErrorDiv.classList.remove('d-none'); // remove d-non to make error visable //
                fileInput.value = ''; // clear file input field //
            } else {
                fileInputErrorDiv.textContent = '';
                fileInputErrorDiv.classList.add('d-none');
            }
        } else {
            fileInputErrorDiv.textContent = '';
            fileInputErrorDiv.classList.add('d-none');
        }
    });

});

