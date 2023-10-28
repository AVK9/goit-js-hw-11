import { refs} from '../index';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



export default function creatMarkup(respArr) {
   console.log(respArr);
   const markupGel = respArr.map((
      {
         webformatURL,
         largeImageURL,
         tags,
         likes,
         views,
         comments,
         downloads,
      }
   ) => `
       <div class="photo-card">
          <a class="gallery__link" href="${largeImageURL}">
             <img class="images" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                   <p class="info-item"><b>Likes</b> <br>${likes}</p>
                   <p class="info-item"><b>Views</b> <br>${views}</p>
                   <p class="info-item"><b>Comments</b> <br>${comments}</p>
                   <p class="info-item"><b>Downloads</b> <br>${downloads}</p>
                </div>
          </a>
       </div>
       `).join("");
   refs.gallery.innerHTML = markupGel;
      let lightbox;
lightbox = new SimpleLightbox('.gallery a');

}


//<li class="gallery__item">
  // <a class="gallery__link" unsafe-inline href="${largeImageURL}">
  //    <img
 //         class="gallery__image"
 //         src="${webformatURL}"
 //         alt="${tags}"
 //         loading="lazy" />
//   </a>
//</li>