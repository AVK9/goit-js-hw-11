import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "40254095-fb7e3bf791467f50a6328bb1e";
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.headers.common["x-api-key"] = `${API_KEY}`;

const refs = {
    form: document.querySelector('#search-form"'),
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
}

let inputDataUser;

refs.form.addEventListener('submit', searchQuery)
function searchQuery(e) {
    e.preventDefault();
    console.log(e.value);
}

function pixabayBase (inputDataUser) { 
   return axios.get('/', {
        params: {
           q: inputDataUser,
           image_type: "photo",
           orientation: "horizontal",
           safesearch: "true",
        }
   })
        .then(response => {
      console.log(response.data);
    })

};
