import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://api.thecatapi.com'
axios.defaults.headers.common["x-api-key"] = "live_heUoztZVq1u2UzqrJKnl8LBx2AjbDxvkHZxaM6sbGd42tiOgdvy0yOiSZrw2HTWN";

const catSwitcherEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('p.loader');

let breedsList = [];

function createBreedList(data) {
    breedsList = data.map(el => {    
        const opt = document.createElement("option");
        opt.setAttribute("value", `${el.id}`);
        opt.textContent = el.name;
        
        return catSwitcherEl.append(opt);
    })
}
 
function fetchBreeds() {
    axios.get(`/v1/breeds`)
    .then(response => {
        createBreedList(response.data);
        
        loaderEl.style.display = 'none';
        catSwitcherEl.style.visibility = 'visible';
        
        new SlimSelect({
            select: '.breed-select',
            settings: {
                placeholderText: 'Select a breed',
            },
        });
        }).catch(error => {
        errorHandler(error);
    });
}

function createCatCard(data) {
    const catBio = data.breeds[0];
                
    const catInfo = `
    <img src="${data.url}" alt="${catBio.name}" width ="640"/>
    <h2>${catBio.name}</h2>
    <p><b>Temperament:</b> ${catBio.temperament}</p>
    <p><b>Description:</b> ${catBio.description}</p>`;
                
    catInfoEl.innerHTML = catInfo;
}

function fetchCatByBreed(event) {
    loaderEl.style.display = 'flex';
    breed_ids = event.target.value;

    axios.get(`/v1/images/search?breed_ids=${breed_ids}`)
        .then(response => {
            createCatCard(response.data[0]);

            loaderEl.style.display = 'none';
        })
        .catch(error => {
            errorHandler(error);
        })
}

function errorHandler(error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    console.log(error);
}

export { fetchBreeds,fetchCatByBreed,catSwitcherEl };