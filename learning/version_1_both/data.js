// Load JSON File
let e_data;


async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        e_data = await response.json();
        return e_data;

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}