import { fetchBreeds, fetchCatByBreed, catSwitcherEl } from './js/cat-api';

fetchBreeds();

catSwitcherEl.addEventListener('change', breedHandler);

function breedHandler(event) { 
    fetchCatByBreed(event);
}



// fetch(`${BASE_URL}/v1/breeds`).then(response => {
//     if (!response.ok) {
//         throw new Error(response.status);
//     }

//     return response.json();
// }).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.log(error);
// });














