import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "40254095-fb7e3bf791467f50a6328bb1e";
axios.defaults.baseURL = 'https://pixabay.com/api';

const refs = {
    form: document.querySelector('#search-form'),  
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
}
const { searchQuery} = refs.form.elements;

// let inputDataUser;

refs.form.addEventListener('submit', onSearchQuery)
function onSearchQuery(e) {
    e.preventDefault();
    pixabayBase(searchQuery.value);
    
}

function pixabayBase (inputDataUser) { 
   return axios.get('/', {
       params: {
           key: API_KEY,
           q: inputDataUser,
           image_type: "photo", 
           orientation: "horizontal",
           safesearch: "true",
        }
   })
       .then(resp => {
            refs.gallery.innerHTML =  creatMarkup(resp.data.hits);
           console.log(resp.data.hits.length);
           if (!resp.data.hits.length) {
               Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            }
    })

};

function creatMarkup(arr) {
   // console.log(arr);
    return arr.map((
     {
 webformatURL,
largeImageURL,
tags,
likes,
views,
comments,
downloads
}
     ) =>
     `

   
<div class="photo-card">
<a class="gallery__link" href="${largeImageURL}">
  <img class="images" src="${webformatURL}" alt="${tags}" loading="lazy" />
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b> <br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b> <br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> <br>${downloads}
    </p>
  </div>
  </a>
</div>
        `).join("");

}
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: "alt",
        captionDelay: 250,
});