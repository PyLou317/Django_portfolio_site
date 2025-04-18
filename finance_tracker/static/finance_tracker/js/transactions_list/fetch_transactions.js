'use strict';

export async function fetchData(url, searchTerm = '') {
    try {
        const searchUrl = searchTerm ? `${url}?q=${searchTerm}` : url;
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        return null;
    }
}