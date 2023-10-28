import Notiflix from 'notiflix';
import pixabayBase from './js/gallery-pixabay.js' 
import creatMarkup from './js/create-markup.js'


const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    messageFinish: document.querySelector('.message-finish')
}

const { searchQuery} = refs.form.elements;
let inputDataUser;

refs.form.addEventListener('submit', onSearchQuery)
async function onSearchQuery(e) {
  e.preventDefault();
  inputDataUser = searchQuery.value.trim();
  if (!inputDataUser) {
    console.log('Pleasure Input Search images...');
    return Notiflix.Notify.failure(`Pleasure Input Search images...`);
  }
    try {
    const resp = await pixabayBase(inputDataUser);
      const respArr = resp.hits;
      // console.log(respArr);
      // console.log(refs.gallery);
      creatMarkup(respArr);
    
  }
  catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
  }

};

//////////////////////////////////////////////////////////////

// function search() {
// page = 1;
// refs.gallery.innerHTML = '';

// };

export { refs};

