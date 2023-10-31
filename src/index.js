import Notiflix from 'notiflix';
import pixabayBase from './js/gallery-pixabay.js' 
import creatMarkup from './js/create-markup.js'


export const refs = {
    form: document.querySelector('#search-form'),
    dataInput: document.querySelector('.search-input'),
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    messageFinish: document.querySelector('.message-finish')
}

const { searchQuery } = refs.form.elements;
let inputDataUser;
export let page = 1;
const perPage = 40;

refs.form.addEventListener('submit', onSearchQuery)
async function onSearchQuery(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  refs.messageFinish.classList.add('hidden')
  refs.loadmoreBtn.classList.add('hidden');
  page = 1;
  inputDataUser = e.currentTarget.searchQuery.value.trim();
  
  if (!inputDataUser) {
    console.log('Pleasure Input Search images...');
    return Notiflix.Notify.failure(`Pleasure Input Search images...`);
  };

    try {
      const resp = await pixabayBase(inputDataUser);
      const respArr = resp.hits;
      const totalHits = resp.totalHits;
      // creatMarkup(respArr);
       
      if (totalHits > perPage) {
        refs.loadmoreBtn.classList.remove('hidden')
        page++;
        refs.messageFinish.classList.add('hidden')
        // refs.gallery.innerHTML = '';
        refs.dataInput.value = '';
      } 
      if (totalHits < perPage) {
        refs.loadmoreBtn.classList.add('hidden')
        refs.messageFinish.classList.remove('hidden')
        refs.dataInput.value = '';
      } 
      
     if (!resp.totalHits) {
          Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
       refs.messageFinish.classList.add('hidden')
       refs.gallery.innerHTML = '';
       refs.dataInput.value = ''; 
      } else {
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        creatMarkup(respArr);
      };
  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
  }
};

//////////////////////////////////////////////////////////////

refs.loadmoreBtn.addEventListener('click', onLoadQuery)
async function onLoadQuery() {
    try {
      const resp = await pixabayBase(inputDataUser);
       smoothScrol();
            page++;
      const respArr = resp.hits;
      const totalHits = resp.totalHits;
     const totalPage = Math.ceil(totalHits / respArr.length);

      // refs.gallery.innerHTML = '';
      creatMarkup(respArr);
      // console.log(respArr.length);
      // console.log(totalHits);
      // console.log(totalPage);

      // console.log(respArr.length);
      if (respArr.length < perPage) {
        refs.messageFinish.classList.remove('hidden');
        refs.loadmoreBtn.classList.add('hidden');
        refs.dataInput.value = '';
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
      };

       if (page === totalPage-1) {
          refs.messageFinish.classList.remove('hidden');
          Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
          refs.loadmoreBtn.classList.add('hidden');
          refs.dataInput.value = '';
        }

  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
  }
};
/////////////////////////////////////////////////////////

function smoothScrol() {

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}

